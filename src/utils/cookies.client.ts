'use client';

import {ACCESS_TOKEN_COOKIE, normalizeRole, REFRESH_TOKEN_COOKIE, USER_ROLE_COOKIE,} from '@/lib/auth/authorization';
import {UserRole} from '@/types/Auth.types';

type CookieOptions = {
	path?: string;
	secure?: boolean;
	sameSite?: 'lax' | 'strict' | 'none';
	maxAge?: number;
};

function setCookie (name: string, value: string, options: CookieOptions = {}) {
	const isProduction = process.env.NODE_ENV === 'production';
	const path = options.path ?? '/';
	const secure = options.secure ?? isProduction;
	const sameSite = options.sameSite ?? 'lax';
	const maxAge =
		typeof options.maxAge === 'number' ? `; Max-Age=${options.maxAge}` : '';
	const secureFlag = secure ? '; Secure' : '';
	document.cookie = `${name}=${encodeURIComponent (value)}; Path=${path}; SameSite=${sameSite}${secureFlag}${maxAge}`;
}

function deleteCookie (name: string) {
	setCookie (name, '', {maxAge: 0});
}

export function getCookieValue (name: string): string | null {
	if (typeof document === 'undefined') return null;
	const cookies = document.cookie.split ('; ').map ((cookie) => cookie.trim ());
	for (const cookie of cookies) {
		if (cookie.startsWith (`${name}=`)) {
			return decodeURIComponent (cookie.slice (name.length + 1));
		}
	}
	return null;
}

export async function setAuthCookies (
	accessToken: string,
	refreshToken: string,
): Promise<void> {
	setCookie (ACCESS_TOKEN_COOKIE, accessToken);
	setCookie (REFRESH_TOKEN_COOKIE, refreshToken);
}

export function setRoleCookie (role: UserRole): void {
	setCookie (USER_ROLE_COOKIE, role);
}

export function getRoleCookie (): UserRole {
	return normalizeRole (getCookieValue (USER_ROLE_COOKIE));
}

export async function clearAuthCookies (): Promise<void> {
	deleteCookie (ACCESS_TOKEN_COOKIE);
	deleteCookie (REFRESH_TOKEN_COOKIE);
	deleteCookie (USER_ROLE_COOKIE);
}
