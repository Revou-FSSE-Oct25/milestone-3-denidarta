export interface ProductFilters {
	title?: string;
	price?: number;
	price_min?: number;
	price_max?: number;
	categoryId?: number;
	categorySlug?: string;
	limit?: number;
	offset?: number;
}
