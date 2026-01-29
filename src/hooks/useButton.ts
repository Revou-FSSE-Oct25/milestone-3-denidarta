import {
	type ElementType,
	type HTMLAttributes,
	useCallback,
	useMemo,
} from "react";

export interface UseButtonProps<T extends ElementType = "button"> {
	/**
	 * The HTML element or React component to render.
	 * @default 'button'
	 */
	as?: T;
	/**
	 * The native HTML button type.
	 * @default 'button'
	 */
	type?: "button" | "submit" | "reset";
	/**
	 * Whether the button is disabled.
	 */
	isDisabled?: boolean;
	/**
	 * The callback fired when the button is clicked.
	 */
	onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export function useButton<T extends ElementType = "button">(
	props: UseButtonProps<T>,
) {
	const {
		as: Component = "button",
		isDisabled,
		type = "button",
		onClick,
		...rest
	} = props;

	const isButton = Component === "button";

	const handleClick = useCallback(
		(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
			if (isDisabled) {
				event.preventDefault();
				return;
			}
			onClick?.(event);
		},
		[isDisabled, onClick],
	);

	const buttonProps = useMemo<HTMLAttributes<HTMLButtonElement>>(() => {
		const baseProps = {
			...rest,
			role: "button",
			"aria-disabled": isDisabled,
			onClick: handleClick,
		};

		if (isButton) {
			return {
				...baseProps,
				type: type,
				disabled: isDisabled,
			};
		}

		return {
			...baseProps,
			tabIndex: isDisabled ? -1 : 0,
		};
	}, [rest, isDisabled, handleClick, isButton, type]);

	return {
		Component,
		buttonProps,
	};
}
