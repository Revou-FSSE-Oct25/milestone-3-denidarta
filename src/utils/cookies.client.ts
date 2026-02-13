"use client";

type CookieOptions = {
	path?: string;
	secure?: boolean;
	sameSite?: "lax" | "strict" | "none";
	maxAge?: number;
};

function setCookie(name: string, value: string, options: CookieOptions = {}) {
	const isProduction = process.env.NODE_ENV === "production";
	const path = options.path ?? "/";
	const secure = options.secure ?? isProduction;
	const sameSite = options.sameSite ?? "lax";
	const maxAge =
		typeof options.maxAge === "number" ? `; Max-Age=${options.maxAge}` : "";
	const secureFlag = secure ? "; Secure" : "";
	document.cookie = `${name}=${encodeURIComponent(value)}; Path=${path}; SameSite=${sameSite}${secureFlag}${maxAge}`;
}

export async function setAuthCookies(
	accessToken: string,
	refreshToken: string,
): Promise<void> {
	setCookie("accessToken", accessToken);
	setCookie("refreshToken", refreshToken);
}
