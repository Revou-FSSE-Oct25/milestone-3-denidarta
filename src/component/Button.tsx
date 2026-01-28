"use client";

import React from "react";

export type ButtonProps = {
	children: React.ReactNode;
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	type?: "button" | "submit" | "reset";
	disabled?: boolean;
	className?: string;
};

const Button: React.FC<ButtonProps> = ({
	children,
	onClick,
	type = "button",
	disabled = false,
	className = "",
}) => {
	return (
		<button
			type={type}
			disabled={disabled}
			onClick={onClick}
			className={`w-full bg-emerald-700 py-3 font-bold text-white shadow-xl transition-all hover:brightness-150 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
		>
			{children}
		</button>
	);
};

export default Button;
