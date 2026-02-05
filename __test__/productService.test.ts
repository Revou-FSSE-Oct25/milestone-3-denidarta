import { describe, it, expect, vi } from "vitest";
import { productService } from "./../src/services/product.service";

describe("productService.getProductCategories", () => {
	it("returns categories when fetch succeeds", async () => {
		const mockData = [{ id: 1, name: "Electronics" }];

		global.fetch = vi.fn(() =>
			Promise.resolve({
				ok: true,
				json: () => Promise.resolve(mockData),
			} as Response)
		);

		const result = await productService.getProductCategories(1);

		expect(fetch).toHaveBeenCalledOnce();
		expect(result).toEqual(mockData);
	});

	it("throws an error when fetch fails", async () => {
		global.fetch = vi.fn(() =>
			Promise.resolve({
				ok: false,
			} as Response)
		);

		expect(productService.getProductCategories(1)).rejects.toThrow(
			"Failed to fetch categories"
		);
	});
});