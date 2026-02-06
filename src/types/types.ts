export interface Address {
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