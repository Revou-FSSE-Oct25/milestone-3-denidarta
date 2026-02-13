"use client";

import * as React from "react";
import Button from "@/components/ui/Button";
import {Avatar, IconButton} from "@radix-ui/themes";
import clsx from "clsx";
import Link from "next/link";
import {usePathname} from "next/navigation";

type NavBarState = "guest" | "customer" | "admin";

interface NavBarProps extends React.ComponentPropsWithoutRef<"nav"> {
	state?: NavBarState;
	userAvatarSrc?: string;
	userInitials?: string;
}

type JwtPayload = {
	role?: string;
};

function getCookieValue(name: string): string | null {
	if (typeof document === "undefined") return null;
	const cookies = document.cookie.split("; ").map((cookie) => cookie.trim());
	for (const cookie of cookies) {
		if (cookie.startsWith(`${name}=`)) {
			return decodeURIComponent(cookie.slice(name.length + 1));
		}
	}
	return null;
}

function parseJwtPayload(token: string): JwtPayload | null {
	try {
		const parts = token.split(".");
		if (parts.length < 2) return null;
		const base64Url = parts[1];
		const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
		const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
		if (typeof atob !== "function") return null;
		const json = atob(padded);
		return JSON.parse(json) as JwtPayload;
	} catch {
		return null;
	}
}

function getStateFromAccessToken(): NavBarState {
	const token = getCookieValue("accessToken");
	if (!token) return "guest";
	const payload = parseJwtPayload(token);
	const role = payload?.role?.toLowerCase();
	if (role === "admin") return "admin";
	if (role === "customer") return "customer";
	return "guest";
}

export default function NavBar({
	                               state: stateProp,
	                               userAvatarSrc,
	                               userInitials = "U",
	                               className,
	                               ...props
                               }: NavBarProps) {
	const pathname = usePathname();
	const [resolvedState, setResolvedState] = React.useState<NavBarState>(() => {
		if (stateProp) return stateProp;
		return getStateFromAccessToken();
	});

	React.useEffect(() => {
		if (stateProp) {
			setResolvedState(stateProp);
			return;
		}
		setResolvedState(getStateFromAccessToken());
	}, [stateProp, pathname]);

	React.useEffect(() => {
		if (stateProp) return;
		const handler = () => setResolvedState(getStateFromAccessToken());
		window.addEventListener("auth:changed", handler);
		return () => window.removeEventListener("auth:changed", handler);
	}, [stateProp]);

	const renderActions = () => {
		switch (resolvedState) {
			case "admin":
				return (
					<div className="flex gap-2">
						<Button variant="outline">Dashboard</Button>
						<Button variant="secondary">Log Out</Button>
					</div>
				);
			case "customer":
				return (
					<ul className="flex items-center gap-3">
						<li>
							<IconButton variant="soft" color="gray" aria-label="Open cart">
                <span className="material-symbols-rounded text-[20px]">
                  shopping_cart
                </span>
							</IconButton>
						</li>
						<li>
							<Avatar
								size="2"
								radius="small"
								src={userAvatarSrc}
								fallback={userInitials}
							/>
						</li>
					</ul>
				);
			case "guest":
			default:
				return (
					<div className="flex gap-2">
						<Link href="/login">
							<Button variant="secondary">Log In</Button>
						</Link>
						<Button variant="primary">Sign Up</Button>
					</div>
				);
		}
	};

	return (
		<nav
			className={clsx(
				"border-b flex flex-row justify-between items-center px-6 h-16",
				className,
			)}
			{...props}
		>
			<div className="flex flex-row items-center justify-center gap-2">
				<svg
					width="32"
					height="32"
					viewBox="0 0 32 32"
					xmlns="http://www.w3.org/2000/svg"
				>
					{/* ... your SVG paths ... */}
				</svg>
				<p className="font-bold">RevoShop</p>
			</div>

			<div>{renderActions()}</div>
		</nav>
	);
}
