"use client";

import useCart from "@/hooks/useCart";
import Button from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import {getCartTotal} from "@/lib/cart/shoppingCart";

export default function CheckoutPage() {
	const {cart, remove, update} = useCart();
	const total = getCartTotal(cart);

	if (cart.length === 0) {
		return (
			<div className="min-h-screen bg-surface px-4 py-12 sm:px-8 flex flex-col items-center justify-center">
				<h1 className="text-4xl font-black mb-4">Your Cart is Empty</h1>
				<Link href="/">
					<Button>Start Shopping</Button>
				</Link>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-surface px-4 py-12 sm:px-8">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-3xl font-bold mb-8 font-bricolage">
					Shopping Cart
				</h1>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					<div className="lg:col-span-2 space-y-4">
						{cart.map((item) => (
							<div
								key={item.id}
								className="flex gap-4 p-4 bg-white rounded-lg border border-outline-variant shadow-sm"
							>
								<div className="relative w-24 h-24 shrink-0 bg-gray-100 rounded-md overflow-hidden">
									{item.image && (
										<Image
											src={item.image}
											alt={item.title}
											fill
											className="object-cover"
										/>
									)}
								</div>
								<div className="flex-1 flex flex-col justify-between">
									<div>
										<h3 className="font-bold text-lg">
											{item.title}
										</h3>
										<p className="text-on-surface-variant text-sm">
											${item.price.toLocaleString()}
										</p>
									</div>
									<div className="flex items-center justify-between mt-2">
										<div className="flex items-center border border-outline rounded-md">
											<button
												onClick={() =>
													update(
														item.id,
														item.quantity - 1,
													)
												}
												className="px-3 py-1 hover:bg-gray-100"
												disabled={item.quantity <= 1}
											>
												-
											</button>
											<span className="px-3 py-1 font-medium">
												{item.quantity}
											</span>
											<button
												onClick={() =>
													update(
														item.id,
														item.quantity + 1,
													)
												}
												className="px-3 py-1 hover:bg-gray-100"
											>
												+
											</button>
										</div>
										<button
											onClick={() => remove(item.id)}
											className="text-error hover:underline text-sm font-medium"
										>
											Remove
										</button>
									</div>
								</div>
							</div>
						))}
					</div>

					<div className="lg:col-span-1">
						<div className="bg-white p-6 rounded-lg border border-outline-variant shadow-sm sticky top-24">
							<h2 className="text-xl font-bold mb-4 font-bricolage">
								Order Summary
							</h2>
							<div className="space-y-2 mb-4 text-sm">
								<div className="flex justify-between">
									<span className="text-on-surface-variant">
										Subtotal
									</span>
									<span className="font-medium">
										${total.toLocaleString()}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-on-surface-variant">
										Shipping
									</span>
									<span className="font-medium">
										Calculated at next step
									</span>
								</div>
							</div>
							<div className="border-t pt-4 mb-6">
								<div className="flex justify-between text-lg font-bold">
									<span>Total</span>
									<span>${total.toLocaleString()}</span>
								</div>
							</div>
							<Button className="w-full text-center py-4 rounded-none uppercase tracking-widest text-lg">
								Checkout
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
