import * as React from "react";
import {Slot} from "@radix-ui/react-slot";
import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	asChild?: boolean
	variant?: "primary" | "secondary"
	leftIcon?: React.ReactNode
	rightIcon?: React.ReactNode
	isLoading?: boolean
}

export default function Button({
	                               className,
	                               variant = "primary",
	                               asChild = false,
	                               leftIcon,
	                               rightIcon,
	                               isLoading = false,
	                               children,
	                               disabled,
	                               ...props
                               }: ButtonProps) {
	const Comp = asChild ? Slot : "button";

	return (
		<Comp
			className={clsx(
				"inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium transition",
				"disabled:opacity-50 disabled:pointer-events-none",
				variant === "primary" && "bg-blue-600 text-white",
				variant === "secondary" && "bg-gray-200 text-black",
				className
			)}
			disabled={disabled || isLoading}
			{...props}
		>
			{/* Left Icon */}
			{!isLoading && leftIcon}

			{/* Loading Spinner */}
			{isLoading && (
				<span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"/>
			)}

			{children}

			{/* Right Icon */}
			{!isLoading && rightIcon}
		</Comp>
	);
}