import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'outline' | 'ghost' | 'danger' | 'onDark';
	size?: 'sm' | 'md' | 'lg';
	isLoading?: boolean;
}

export default function Button({
	children,
	variant = 'primary',
	size = 'md',
	isLoading,
	className = '',
	...props
}: ButtonProps) {

	const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-outline focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

	const variants = {
		primary: "bg-primary text-on-primary hover:bg-primary/90",
		outline: "border border-outline bg-transparent hover:bg-surface-variant",
		ghost: "bg-transparent hover:bg-surface-variant text-on-surface",
		danger: "bg-error text-on-error",
		onDark: "bg-surface-container-lowest text-on-surface border-outline border-2",
	};

	const sizes = {
		sm: "h-9 px-3 text-xs",
		md: "h-10 py-2 px-4",
		lg: "h-11 px-8 text-lg",
	};

	const combinedClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

	return (
		<button
			className={combinedClasses}
			disabled={isLoading || props.disabled}
			{...props}
		>
			{isLoading ? (
				<svg className="animate-spin h-5 w-5 mr-2 text-current" viewBox="0 0 24 24">
					<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
					<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
				</svg>
			) : null}
			{children}
		</button>
	);
}

