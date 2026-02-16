export const API_BASE_URL = 'https://api.escuelajs.co/api/v1';
export const PRODUCT_API_URL = `${API_BASE_URL}/products`;
export const CATEGORY_API_URL = `${API_BASE_URL}/categories`;
export const USER_API_URL = `${API_BASE_URL}/users`;
export const AUTH_TOKEN_URL = `${API_BASE_URL}/auth/login`;

export const API_ENDPOINTS = {
	products: `${API_BASE_URL}/products`,
	users: `${API_BASE_URL}/users`,
	categories: `${API_BASE_URL}/categories`,
	authLogin: `${API_BASE_URL}/auth/login`,
} as const;