import {ProductFilters} from '@/types/FilterParameters';
import {API_ENDPOINTS} from '@/constants/API_CONSTANTS';

export const buildQueryParams = (filters: Record<string, any>): string => {
	const params = new URLSearchParams ();
	Object.entries (filters).forEach (([key, value]) => {
		if (value !== undefined && value !== null && value !== '') {
			params.append (key, String (value));
		}
	});
	return params.toString ();
};

export const getFilteredProducts = async (filters: ProductFilters) => {
	const query = buildQueryParams (filters);
	const res = await fetch (
		query ? `${API_ENDPOINTS.products}?${query}` : API_ENDPOINTS.products,
	);
	
	if (!res.ok) {
		throw new Error ('Failed to fetch products');
	}
	
	return res.json ();
};
