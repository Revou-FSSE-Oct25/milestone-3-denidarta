// utils/cookies.ts
import {cookies} from "next/headers";

/**
 * Sets the access and refresh tokens in the server-side cookies.
 * Note: This function can only be used in Server Actions or Route Handlers.
 */
export async function setAuthCookies(accessToken: string, refreshToken: string): Promise<void> {
	const cookieStore = await cookies();
	const isProduction = process.env.NODE_ENV === "production";

	cookieStore.set("accessToken", accessToken, {
		path: "/",
		httpOnly: true, // Prevents client-side JS from accessing the cookie
		secure: isProduction, // Only send over HTTPS in production
		sameSite: "lax",
	});
	cookieStore.set("refreshToken", refreshToken, {
		path: "/",
		httpOnly: true,
		secure: isProduction,
		sameSite: "lax"
	});
}

/**
 * Retrieves the tokens from the request cookies.
 */
export async function getAuthCookies(): Promise<{ accessToken: string | null; refreshToken: string | null }> {
	const cookieStore = await cookies();
	return {
		accessToken: cookieStore.get("accessToken")?.value || null,
		refreshToken: cookieStore.get("refreshToken")?.value || null,
	};
}