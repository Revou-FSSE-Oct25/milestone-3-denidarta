import {addToCart, getCartTotal, removeFromCart, updateQuantity,} from '@/lib/cart/shoppingCart';
import {ShoppingCart} from '@/types/ShoppingCart';

describe ('shoppingCart helpers', () => {
	const itemA = {id: 1, title: 'A', price: 10, image: '/a.png'} as const;
	const itemB = {id: 2, title: 'B', price: 5, image: '/b.png'} as const;
	
	describe ('addToCart', () => {
		it ('adds a new item with quantity 1', () => {
			const cart: ShoppingCart[] = [];
			const result = addToCart (cart, itemA);
			
			expect (result).toEqual ([{...itemA, quantity: 1}]);
			expect (result).not.toBe (cart);
			expect (cart).toEqual ([]);
		});
		
		it ('increments quantity when item already exists', () => {
			const cart: ShoppingCart[] = [
				{...itemA, quantity: 1},
				{...itemB, quantity: 2},
			];
			
			const result = addToCart (cart, itemA);
			
			expect (result).toEqual ([
				{...itemA, quantity: 2},
				{...itemB, quantity: 2},
			]);
			expect (result).not.toBe (cart);
			expect (cart[0].quantity).toBe (1);
		});
	});
	
	describe ('removeFromCart', () => {
		it ('removes matching item by id', () => {
			const cart: ShoppingCart[] = [
				{...itemA, quantity: 1},
				{...itemB, quantity: 2},
			];
			
			const result = removeFromCart (cart, 1);
			expect (result).toEqual ([{...itemB, quantity: 2}]);
			expect (result).not.toBe (cart);
		});
		
		it ('returns identical items when id is not found (new array)', () => {
			const cart: ShoppingCart[] = [{...itemA, quantity: 1}];
			const result = removeFromCart (cart, 999);
			
			expect (result).toEqual (cart);
			expect (result).not.toBe (cart);
		});
	});
	
	describe ('updateQuantity', () => {
		it ('updates quantity for the specified id', () => {
			const cart: ShoppingCart[] = [
				{...itemA, quantity: 1},
				{...itemB, quantity: 2},
			];
			
			const result = updateQuantity (cart, 2, 7);
			
			expect (result).toEqual ([
				{...itemA, quantity: 1},
				{...itemB, quantity: 7},
			]);
			expect (result).not.toBe (cart);
			expect (cart[1].quantity).toBe (2);
		});
		
		it ('removes item when quantity is 0', () => {
			const cart: ShoppingCart[] = [
				{...itemA, quantity: 1},
				{...itemB, quantity: 2},
			];
			
			expect (updateQuantity (cart, 1, 0)).toEqual ([{...itemB, quantity: 2}]);
		});
		
		it ('removes item when quantity is negative', () => {
			const cart: ShoppingCart[] = [{...itemA, quantity: 1}];
			expect (updateQuantity (cart, 1, -3)).toEqual ([]);
		});
	});
	
	describe ('getCartTotal', () => {
		it ('returns 0 for empty cart', () => {
			expect (getCartTotal ([])).toBe (0);
		});
		
		it ('sums price * quantity for all items', () => {
			const cart: ShoppingCart[] = [
				{...itemA, quantity: 3}, // 30
				{...itemB, quantity: 2}, // 10
			];
			expect (getCartTotal (cart)).toBe (40);
		});
	});
});

