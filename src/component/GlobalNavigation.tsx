"use client";

import Link from "next/link";
import useCart from "@/hooks/useCart";
import { useEffect, useState } from "react";

export const GlobalNavigation = () => {
	const { cart } = useCart();
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

	return (
		<div className="flex flex-row justify-between items-center h-[80px] bg-secondary-container border-b border-outline-variant sticky top-0 z-50 px-[24px]">
			<div>
				<Link href="/" className="font-bricolage font-bold text-xl text-on-secondary-container">
					RevoTech
				</Link>
			</div>
			<div id="search-box" className="transition-colors duration-200 group hover:bg-secondary flex flex-row h-14 bg-secondary-fixed-dim rounded-full px-24 justify-self-center items-center justify-center w-full max-w-300">
				<span className="text-on-secondary-fixed-variant material-symbols-rounded group-hover:text-on-secondary">
					search
				</span>
				<p className="text-on-secondary-fixed-variant text-base group-hover:text-on-secondary">Search Box</p>
			</div>
			<div id="right-element" className="flex flex-row gap-8 mr-8">
				<Link href="/checkout">
					<div className="bg-tertiary-container rounded-full p-4 hover:bg-secondary relative">
						<span className="material-symbols-rounded text-on-secondary-container select-none m-auto" style={{ fontSize: '24px' }}>
							shopping_basket
						</span>
						{isClient && itemCount > 0 && (
							<span className="absolute -top-1 -right-1 bg-error text-on-error text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
								{itemCount}
							</span>
						)}
					</div>
				</Link>
				<div className="bg-tertiary-container rounded-full size-[56px] hover:bg-secondary flex items-center justify-center">
					<span className="material-symbols-rounded text-on-secondary-container select-none m-auto" style={{ fontSize: '24px' }}>
						account_circle
					</span>
				</div>
			</div>
		</div>
	);
};

export default GlobalNavigation;
