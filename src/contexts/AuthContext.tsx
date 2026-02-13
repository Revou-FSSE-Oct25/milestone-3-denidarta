"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { LoginRequest, UserRole } from "@/types/auth.types";
import { sendLoginRequest } from "@/services/auth.service";
import { fetchAllUsers } from "@/services/user.service";
import {
	clearAuthCookies,
	getRoleCookie,
	setAuthCookies,
	setRoleCookie,
} from "@/utils/cookies.client";
import { normalizeRole } from "@/lib/auth/authorization";
import { User } from "@/types/user.types";

interface AuthContextValue {
	role: UserRole;
	isAuthenticated: boolean;
	isGuest: boolean;
	isCustomer: boolean;
	isAdmin: boolean;
	login: (credentials: LoginRequest) => Promise<UserRole>;
	logout: () => Promise<void>;
	hasRole: (...roles: UserRole[]) => boolean;
}

const AuthContext = React.createContext<AuthContextValue | null>(null);

const fallbackAuthContext: AuthContextValue = {
	role: "guest",
	isAuthenticated: false,
	isGuest: true,
	isCustomer: false,
	isAdmin: false,
	login: async () => "guest",
	logout: async () => undefined,
	hasRole: () => false,
};

function resolveRoleByCredentials(
	users: User[],
	credentials: LoginRequest,
): UserRole | null {
	const user = users.find(
		(item) =>
			item.email.toLowerCase() === credentials.email.toLowerCase() &&
			item.password === credentials.password,
	);

	if (!user) return null;
	const role = normalizeRole(user.role);
	return role === "guest" ? null : role;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const [role, setRole] = React.useState<UserRole>("guest");

	const syncRoleFromSession = React.useCallback(() => {
		setRole(getRoleCookie());
	}, []);

	React.useEffect(() => {
		syncRoleFromSession();
	}, [pathname, syncRoleFromSession]);

	React.useEffect(() => {
		const handler = () => syncRoleFromSession();
		window.addEventListener("auth:changed", handler);
		return () => window.removeEventListener("auth:changed", handler);
	}, [syncRoleFromSession]);

	const login = React.useCallback(
		async (credentials: LoginRequest): Promise<UserRole> => {
			const sanitizedCredentials: LoginRequest = {
				email: credentials.email.trim(),
				password: credentials.password,
			};

			const tokens = await sendLoginRequest(sanitizedCredentials);
			await setAuthCookies(tokens.accessToken, tokens.refreshToken);

			const users = await fetchAllUsers();
			const resolvedRole = resolveRoleByCredentials(
				users,
				sanitizedCredentials,
			);

			if (!resolvedRole) {
				await clearAuthCookies();
				throw new Error(
					"Unable to resolve role for authenticated credentials.",
				);
			}

			setRoleCookie(resolvedRole);
			setRole(resolvedRole);
			window.dispatchEvent(new Event("auth:changed"));
			return resolvedRole;
		},
		[],
	);

	const logout = React.useCallback(async () => {
		await clearAuthCookies();
		setRole("guest");
		window.dispatchEvent(new Event("auth:changed"));
	}, []);

	const hasRole = React.useCallback(
		(...roles: UserRole[]) => roles.includes(role),
		[role],
	);

	const value = React.useMemo<AuthContextValue>(
		() => ({
			role,
			isAuthenticated: role !== "guest",
			isGuest: role === "guest",
			isCustomer: role === "customer",
			isAdmin: role === "admin",
			login,
			logout,
			hasRole,
		}),
		[role, login, logout, hasRole],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
	const context = React.useContext(AuthContext);
	return context ?? fallbackAuthContext;
}
