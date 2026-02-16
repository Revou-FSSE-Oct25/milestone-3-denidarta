import { fetchService } from "./product.service";
import { CATEGORY_API_URL, PRODUCT_API_URL } from "@/constants/API_CONSTANTS";
import axios from "axios";

jest.mock("axios");
global.fetch = jest.fn();

describe("productService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllProducts", () => {
    it("should fetch and return all products", async () => {
      const mockProducts = [{ id: "1", name: "Product 1" }];

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProducts,
      });

      const result = await fetchService.getAllProducts();

      expect(fetch).toHaveBeenCalledWith(PRODUCT_API_URL);
      expect(result).toEqual(mockProducts);
    });

    it("should throw error when fetch fails", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

      await expect(fetchService.getAllProducts()).rejects.toThrow(
        "Failed to fetch products",
      );
    });
  });

  describe("getProductById", () => {
    it("should fetch and return product by id", async () => {
      const mockProduct = { id: "1", name: "Product 1" };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProduct,
      });

      const result = await fetchService.getProductById("1");

      expect(fetch).toHaveBeenCalledWith(`${PRODUCT_API_URL}/1`);
      expect(result).toEqual(mockProduct);
    });

    it("should throw error when fetch fails", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

      await expect(fetchService.getProductById("1")).rejects.toThrow(
        "Failed to fetch product with id 1",
      );
    });
  });

  describe("getProductsByCategory", () => {
    it("should fetch and return products by category", async () => {
      const mockProducts = [{ id: "1", name: "Product 1" }];

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProducts,
      });

      const result = await fetchService.getProductsByCategory(2);

      expect(fetch).toHaveBeenCalledWith(`${CATEGORY_API_URL}/2/products`);
      expect(result).toEqual(mockProducts);
    });

    it("should throw error when fetch fails", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

      await expect(fetchService.getProductsByCategory(2)).rejects.toThrow(
        "Failed to fetch category products",
      );
    });
  });

  describe("getProductCategories", () => {
    it("should fetch and return product categories", async () => {
      const mockCategories = [{ id: 1, name: "Category 1" }];

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockCategories,
      });

      const result = await fetchService.getProductCategories();

      expect(fetch).toHaveBeenCalledWith(CATEGORY_API_URL);
      expect(result).toEqual(mockCategories);
    });

    it("should throw error when fetch fails", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

      await expect(fetchService.getProductCategories()).rejects.toThrow(
        "Failed to fetch categories",
      );
    });
  });

  describe("addProduct", () => {
    const mockProductPayload = {
      title: "Test Product",
      description: "This is a test product",
      price: 100,
      categoryId: 1,
    };
    const mockAddedProduct = { id: "123", ...mockProductPayload };

    it("should add a product successfully", async () => {
      (axios.post as jest.Mock).mockResolvedValueOnce({
        data: mockAddedProduct,
      });

      const result = await fetchService.addProduct(mockProductPayload);

      expect(axios.post).toHaveBeenCalledWith(
        PRODUCT_API_URL,
        mockProductPayload,
      );
      expect(result).toEqual(mockAddedProduct);
    });

    it("should throw an error if the API call fails", async () => {
      const errorMessage = "Network Error";
      (axios.post as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

      await expect(fetchService.addProduct(mockProductPayload)).rejects.toThrow(
        errorMessage,
      );
    });

    it("should throw an error with message from API response if available", async () => {
      const apiErrorMessage = "Product creation failed";
      const axiosError = {
        isAxiosError: true,
        response: {
          data: {
            message: apiErrorMessage,
          },
        },
        message: "Request failed with status code 400",
      };
      (axios.post as jest.Mock).mockRejectedValueOnce(axiosError);

      await expect(fetchService.addProduct(mockProductPayload)).rejects.toThrow(
        apiErrorMessage,
      );
    });

    it("should throw an unexpected error if not an axios error", async () => {
      const genericError = new Error("Something went wrong");
      (axios.post as jest.Mock).mockRejectedValueOnce(genericError);

      await expect(fetchService.addProduct(mockProductPayload)).rejects.toThrow(
        "Unexpected error",
      );
    });
  });
});
