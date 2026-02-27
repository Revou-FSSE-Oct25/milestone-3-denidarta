import {clampPage, PAGE_SIZE_DEFAULT, paginateItems} from "./pagination";

describe("pagination utilities", () => {
	it("returns first page with max 10 items by default", () => {
		const items = Array.from({length: 25}, (_, index) => index + 1);
		const result = paginateItems(items, 1);

		expect(result.pageItems).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
		expect(result.currentPage).toBe(1);
		expect(result.totalPages).toBe(3);
		expect(result.totalItems).toBe(25);
		expect(result.pageItems).toHaveLength(PAGE_SIZE_DEFAULT);
	});

	it("returns correct slice for middle page", () => {
		const items = Array.from({length: 35}, (_, index) => index + 1);
		const result = paginateItems(items, 2, 10);

		expect(result.pageItems).toEqual([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
		expect(result.currentPage).toBe(2);
		expect(result.totalPages).toBe(4);
	});

	it("clamps page below range to page 1", () => {
		expect(clampPage(0, 5)).toBe(1);
		expect(clampPage(-3, 5)).toBe(1);

		const result = paginateItems([1, 2, 3], 0, 2);
		expect(result.currentPage).toBe(1);
		expect(result.pageItems).toEqual([1, 2]);
	});

	it("clamps page above range to last page", () => {
		expect(clampPage(9, 3)).toBe(3);

		const result = paginateItems(Array.from({length: 22}, (_, index) => index + 1), 99, 10);
		expect(result.currentPage).toBe(3);
		expect(result.pageItems).toEqual([21, 22]);
	});

	it("handles empty arrays safely with one logical page", () => {
		const result = paginateItems([], 2, 10);

		expect(result.pageItems).toEqual([]);
		expect(result.currentPage).toBe(1);
		expect(result.totalPages).toBe(1);
		expect(result.totalItems).toBe(0);
	});
});
