import {UserRole} from '@/types/Auth.types';

export const ACCESS_TOKEN_COOKIE = 'accessToken';
export const REFRESH_TOKEN_COOKIE = 'refreshToken';
export const USER_ROLE_COOKIE = 'userRole';

export type RouteAccessDecision = 'allow' | 'redirect-home' | 'not-found';

function normalizePathname (pathname: string): string {
	if (pathname === '/') return pathname;
	return pathname.endsWith ('/') ? pathname.slice (0, -1) : pathname;
}

export function normalizeRole (value: string | null | undefined): UserRole {
	const normalized = value?.toLowerCase ();
	if (normalized === 'admin') return 'admin';
	if (normalized === 'customer') return 'customer';
	return 'guest';
}

export function isAuthenticatedRole (role: UserRole): boolean {
	return role !== 'guest';
}

export function isLoginRoute (pathname: string): boolean {
	return normalizePathname (pathname) === '/login';
}

export function isNotFoundRoute (pathname: string): boolean {
	const normalizedPath = normalizePathname (pathname);
	return normalizedPath === '/_not-found' || normalizedPath === '/not-found';
}

export function isCheckoutRoute (pathname: string): boolean {
	return normalizePathname (pathname) === '/checkout';
}

export function isDashboardRoute (pathname: string): boolean {
	const normalizedPath = normalizePathname (pathname);
	return (
		normalizedPath === '/dashboard' ||
		normalizedPath.startsWith ('/dashboard/') ||
		normalizedPath === '/admin' ||
		normalizedPath.startsWith ('/admin/')
	);
}

function canAccessCheckout (role: UserRole): boolean {
	return role === 'customer' || role === 'admin';
}

function canAccessDashboard (role: UserRole): boolean {
	return role === 'admin';
}

export function canAccessPath (role: UserRole, pathname: string): boolean {
	if (isCheckoutRoute (pathname)) return canAccessCheckout (role);
	if (isDashboardRoute (pathname)) return canAccessDashboard (role);
	return true;
}

export function getRouteAccessDecision (
	role: UserRole,
	pathname: string,
): RouteAccessDecision {
	if (isNotFoundRoute (pathname)) return 'allow';
	if (isLoginRoute (pathname) && isAuthenticatedRole (role)) {
		return 'redirect-home';
	}
	if (canAccessPath (role, pathname)) return 'allow';
	return 'not-found';
}
