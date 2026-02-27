export const PAGE_SIZE_DEFAULT = 10;

export interface PaginatedItems<T> {
	pageItems: T[];
	currentPage: number;
	totalPages: number;
	totalItems: number;
}

export function clampPage(page: number, totalPages: number): number {
	const safeTotalPages = Number.isFinite(totalPages) && totalPages > 0
		? Math.floor(totalPages)
		: 1;

	if (!Number.isFinite(page)) {
		return 1;
	}

	return Math.min(Math.max(1, Math.floor(page)), safeTotalPages);
}

export function paginateItems<T>(
	items: T[],
	page: number,
	pageSize: number = PAGE_SIZE_DEFAULT,
): PaginatedItems<T> {
	const safePageSize = Number.isFinite(pageSize) && pageSize > 0
		? Math.floor(pageSize)
		: PAGE_SIZE_DEFAULT;
	const totalItems = items.length;
	const totalPages = Math.max(1, Math.ceil(totalItems / safePageSize));
	const currentPage = clampPage(page, totalPages);
	const start = (currentPage - 1) * safePageSize;
	const end = start + safePageSize;

	return {
		pageItems: items.slice(start, end),
		currentPage,
		totalPages,
		totalItems,
	};
}
