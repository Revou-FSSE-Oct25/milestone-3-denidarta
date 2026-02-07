import * as React from "react";
import {Slot} from "@radix-ui/react-slot";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	asChild?: boolean;
	variant?: ButtonVariant;
	size?: ButtonSize;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
	isLoading?: boolean;
}

export default function Button({
	                               className,
	                               variant = "primary",
	                               size = "md",
	                               asChild = false,
	                               leftIcon,
	                               rightIcon,
	                               isLoading = false,
	                               children,
	                               disabled,
	                               ...props
                               }: ButtonProps) {
	const Comp = asChild ? Slot : "button";

	const baseStyles = clsx(
		"inline-flex items-center justify-center",
		"font-medium transition-all duration-200",
		"disabled:opacity-50 disabled:cursor-not-allowed",
		"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
	);

	const variantStyles: Record<ButtonVariant, string> = {
		primary: clsx(
			"bg-primary text-on-primary",
			"hover:shadow-lg",
			"active:scale-95",
			"focus-visible:ring-primary"
		),
		secondary: clsx(
			"bg-secondary-container text-on-secondary-container",
			"hover:opacity-90",
			"active:scale-95",
			"focus-visible:ring-secondary"
		),
		outline: clsx(
			"bg-surface border-2 border-outline text-on-surface",
			"hover:bg-surface-variant",
			"active:scale-95",
			"focus-visible:ring-outline"
		),
	};

	const sizeStyles: Record<ButtonSize, string> = {
		sm: "px-3 py-1.5 text-sm gap-1.5 rounded-md",
		md: "px-4 py-2 text-base gap-2 rounded-lg",
		lg: "px-6 py-3 text-lg gap-2.5 rounded-xl",
	};

	const iconSizeMap: Record<ButtonSize, string> = {
		sm: "w-4 h-4",
		md: "w-5 h-5",
		lg: "w-6 h-6",
	};

	return (
		<Comp
			className={clsx(
				baseStyles,
				variantStyles[variant],
				sizeStyles[size],
				className
			)}
			disabled={disabled || isLoading}
			type="button"
			{...props}
		>
			{/* Left Icon */}
			{!isLoading && leftIcon && (
				<span className={clsx("flex items-center justify-center", iconSizeMap[size])}>
                    {leftIcon}
                </span>
			)}

			{/* Loading Spinner */}
			{isLoading && (
				<span className={clsx(
					"animate-spin border-2 border-current border-t-transparent rounded-full",
					iconSizeMap[size]
				)}/>
			)}

			{/* Children */}
			{children}

			{/* Right Icon */}
			{!isLoading && rightIcon && (
				<span className={clsx("flex items-center justify-center", iconSizeMap[size])}>
                    {rightIcon}
                </span>
			)}
		</Comp>
	);
}