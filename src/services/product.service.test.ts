import {fetchService} from "./product.service";
import {CATEGORY_API_URL, PRODUCT_API_URL} from "@/constants";

global.fetch = jest.fn();

describe("productService", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("getAllProducts", () => {
		it("should fetch and return all products", async () => {
			const mockProducts = [{id: "1", name: "Product 1"}];

			(fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => mockProducts,
			});

			const result = await fetchService.getAllProducts();

			expect(fetch).toHaveBeenCalledWith(PRODUCT_API_URL);
			expect(result).toEqual(mockProducts);
		});

		it("should throw error when fetch fails", async () => {
			(fetch as jest.Mock).mockResolvedValueOnce({ok: false});

			await expect(fetchService.getAllProducts()).rejects.toThrow(
				"Failed to fetch products"
			);
		});
	});

	describe("getProductById", () => {
		it("should fetch and return product by id", async () => {
			const mockProduct = {id: "1", name: "Product 1"};

			(fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => mockProduct,
			});

			const result = await fetchService.getProductById("1");

			expect(fetch).toHaveBeenCalledWith(`${PRODUCT_API_URL}/1`);
			expect(result).toEqual(mockProduct);
		});

		it("should throw error when fetch fails", async () => {
			(fetch as jest.Mock).mockResolvedValueOnce({ok: false});

			await expect(fetchService.getProductById("1")).rejects.toThrow(
				"Failed to fetch product with id 1"
			);
		});
	});

	describe("getProductsByCategory", () => {
		it("should fetch and return products by category", async () => {
			const mockProducts = [{id: "1", name: "Product 1"}];

			(fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => mockProducts,
			});

			const result = await fetchService.getProductsByCategory(2);

			expect(fetch).toHaveBeenCalledWith(
				`${CATEGORY_API_URL}/2/products`
			);
			expect(result).toEqual(mockProducts);
		});

		it("should throw error when fetch fails", async () => {
			(fetch as jest.Mock).mockResolvedValueOnce({ok: false});

			await expect(
				fetchService.getProductsByCategory(2)
			).rejects.toThrow("Failed to fetch category products");
		});
	});

	describe("getProductCategories", () => {
		it("should fetch and return product categories", async () => {
			const mockCategories = [{id: 1, name: "Category 1"}];

			(fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => mockCategories,
			});

			const result = await fetchService.getProductCategories();

			expect(fetch).toHaveBeenCalledWith(CATEGORY_API_URL);
			expect(result).toEqual(mockCategories);
		});

		it("should throw error when fetch fails", async () => {
			(fetch as jest.Mock).mockResolvedValueOnce({ok: false});

			await expect(
				fetchService.getProductCategories()
			).rejects.toThrow("Failed to fetch categories");
		});
	});
});