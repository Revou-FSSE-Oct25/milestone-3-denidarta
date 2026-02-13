import { NextRequest, NextResponse } from "next/server";
import {
	getRouteAccessDecision,
	normalizeRole,
	USER_ROLE_COOKIE,
} from "@/lib/auth/authorization";

export function proxy(request: NextRequest) {
	const role = normalizeRole(request.cookies.get(USER_ROLE_COOKIE)?.value);
	const decision = getRouteAccessDecision(role, request.nextUrl.pathname);

	if (decision === "allow") {
		return NextResponse.next();
	}

	if (decision === "redirect-home") {
		return NextResponse.redirect(new URL("/", request.url));
	}

	return NextResponse.rewrite(new URL("/_not-found", request.url));
}

export const config = {
	matcher: [
		"/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)",
	],
};
