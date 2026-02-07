import {ShoppingCart} from "@/types/types";

export function addToCart(
	cart: ShoppingCart[],
	item: Omit<ShoppingCart, "quantity">
): ShoppingCart[] {
	const existing = cart.find(p => p.id === item.id);

	if (existing) {
		return cart.map(p =>
			p.id === item.id
				? {...p, quantity: p.quantity + 1}
				: p
		);
	}

	return [...cart, {...item, quantity: 1}];
}

export function removeFromCart(
	cart: ShoppingCart[],
	id: number
): ShoppingCart[] {
	return cart.filter(p => p.id !== id);
}

export function updateQuantity(
	cart: ShoppingCart[],
	id: number,
	quantity: number
): ShoppingCart[] {
	if (quantity <= 0) {
		return removeFromCart(cart, id);
	}

	return cart.map(p =>
		p.id === id ? {...p, quantity} : p
	);
}

export function getCartTotal(cart: ShoppingCart[]): number {
	return cart.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);
}
