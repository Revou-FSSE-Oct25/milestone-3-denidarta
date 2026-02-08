"use client";

import {useEffect, useState} from "react";
import {ShoppingCart} from "@/types/types";
import {addToCart, removeFromCart, updateQuantity,} from "@/lib/transactions/shoppingCart";

const CART_KEY = "shopping-cart";

function readCartFromStorage(): ShoppingCart[] {
	if (typeof window === "undefined") return [];

	const raw = window.localStorage.getItem(CART_KEY);
	if (!raw) return [];

	try {
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? (parsed as ShoppingCart[]) : [];
	} catch (e) {
		console.error("Failed to parse cart", e);
		return [];
	}
}

function useCart() {
	const [cart, setCart] = useState<ShoppingCart[]>(() => readCartFromStorage());

	useEffect(() => {
		window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
	}, [cart]);

	return {
		cart,
		add(item: Omit<ShoppingCart, "quantity">) {
			setCart(currentCart => addToCart(currentCart, item));
		},
		remove(id: number) {
			setCart(c => removeFromCart(c, id));
		},
		update(id: number, quantity: number) {
			setCart(c => updateQuantity(c, id, quantity));
		},
	};
}

export default useCart;
