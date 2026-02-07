"use client";

import * as React from "react";
import Button from "@/components/Button";
import clsx from "clsx";

type NavBarState = "guest" | "user" | "admin";

interface NavBarProps extends React.ComponentPropsWithoutRef<"nav"> {
	state?: NavBarState;
}

export default function NavBar({
	state = "guest",
	className,
	...props
}: NavBarProps) {
	const renderActions = () => {
		switch (state) {
			case "admin":
				return (
					<div className="flex gap-2">
						<Button variant="outline">Dashboard</Button>
						<Button variant="secondary">Log Out</Button>
					</div>
				);
			case "user":
				return (
					<div className="flex gap-2">
						<Button variant="outline">My Orders</Button>
						<Button variant="secondary">Log Out</Button>
					</div>
				);
			case "guest":
			default:
				return (
					<div className="flex gap-2">
						<Button variant="secondary">Log In</Button>
						<Button variant="primary">Sign Up</Button>
					</div>
				);
		}
	};

	return (
		<nav
			className={clsx(
				"border-b flex flex-row justify-between items-center px-6 h-16",
				className
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
