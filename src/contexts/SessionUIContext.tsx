"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { isLoginRoute } from "@/lib/authorization";

interface SessionUIContextValue {
	canAccessCheckoutUI: boolean;
	canAccessAdminUI: boolean;
	showGuestNavigation: boolean;
	showCustomerNavigation: boolean;
	showAdminNavigation: boolean;
	isLoginPage: boolean;
}

const SessionUIContext = React.createContext<SessionUIContextValue | null>(null);

const fallbackSessionUI: SessionUIContextValue = {
	canAccessCheckoutUI: false,
	canAccessAdminUI: false,
	showGuestNavigation: true,
	showCustomerNavigation: false,
	showAdminNavigation: false,
	isLoginPage: false,
};

export function SessionUIProvider({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const { role } = useAuth();

	const value = React.useMemo<SessionUIContextValue>(
		() => ({
			canAccessCheckoutUI: role === "customer" || role === "admin",
			canAccessAdminUI: role === "admin",
			showGuestNavigation: role === "guest",
			showCustomerNavigation: role === "customer",
			showAdminNavigation: role === "admin",
			isLoginPage: isLoginRoute(pathname),
		}),
		[pathname, role],
	);

	return <SessionUIContext.Provider value={value}>{children}</SessionUIContext.Provider>;
}

export function useSessionUI(): SessionUIContextValue {
	const context = React.useContext(SessionUIContext);
	return context ?? fallbackSessionUI;
}
