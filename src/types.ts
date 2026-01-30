export interface ProductCategory {
	id: number
	name: string
	slug: string
	image: string
	creationAt: string
	updatedAt: string
}

export interface ProductDetail {
	id: number
	title: string
	slug: string
	price: number
	description?: string
	category: ProductCategory
	images: string[]
	creationAt: string
	updatedAt: string
}

export interface User {
	id: number;
	email: string;
	password: string;
	name: string;
	role: string;
	avatar: string;
}

export interface ShippingAddress {
	id: number;
}

export interface CardDetail {
	id: number;
	cardNumber: string;
	expiryDate: string;
	cvv: string;
}

export interface ShoppingCart {
	id: number;
	title: string;
	price: number;
	image?: string;
	quantity: number;
}