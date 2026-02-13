import {productService} from "@/services/product.service";

describe("productService.getProductCategories", () => {
	it("returns categories when fetch succeeds", async () => {
		const mockData = [{id: 1, name: "Electronics"}];

		global.fetch = jest.fn(() =>
			Promise.resolve({
				ok: true,
				json: () => Promise.resolve(mockData),
			} as Response)
		);

		const result = await productService.getProductCategories();

		expect(fetch).toHaveBeenCalledTimes(1);
		expect(result).toEqual(mockData);
	});

	it("throws an error when fetch fails", async () => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				ok: false,
			} as Response)
		);

		await expect(productService.getProductCategories()).rejects.toThrow(
			"Failed to fetch categories"
		);
	});
});
