import axios from 'axios';
import {Product} from '@/types/Product.types';
import {PRODUCT_API_URL} from '@/constants/API_CONSTANTS';

const API_URL = PRODUCT_API_URL;

interface AddProductPayload {
	title: string;
	price: number;
	description: string;
	categoryId: number;
	images: string[];
}

export const addProduct = async (productData: AddProductPayload): Promise<Product> => {
	try {
		const response = await axios.post<Product> (API_URL, productData);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError (error)) {
			console.error ('Error adding product:', error.response?.data || error.message);
			throw new Error (error.response?.data?.message || 'Failed to add product');
		}
		console.error ('Unexpected error:', error);
		throw new Error ('An unexpected error occurred');
	}
};

export default addProduct;