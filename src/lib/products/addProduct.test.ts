import axios from "axios";

import {addProduct} from "@/lib/products/addProduct";
import {PRODUCT_API_URL} from "@/constants";
import {Product} from "@/types/product.types";

jest.mock("axios", () => ({
	__esModule: true,
	default: {
		post: jest.fn(),
		isAxiosError: (err: unknown) =>
			Boolean(err && typeof err === "object" && "isAxiosError" in err),
	},
}));

const mockedAxios = axios as unknown as {
	post: jest.Mock;
	isAxiosError: (err: unknown) => boolean;
};

describe("lib/products/addProduct", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	const payload = {
		title: "New Product",
		price: 10,
		description: "A description",
		categoryId: 1,
		images: ["https://placehold.co/600x400"],
	};

	it("posts to PRODUCT_API_URL and returns the response data", async () => {
		const data: Product = {
			id: 210,
			title: "New Product",
			slug: "new-product",
			price: 10,
			description: "A description",
			images: ["https://placehold.co/600x400"],
			category: {
				id: 1,
				name: "Clothes",
				slug: "clothes",
				image: "https://placehold.co/600x400",
				creationAt: "2023-01-03T16:51:33.000Z",
				updatedAt: "2023-01-03T16:51:33.000Z",
			},
			creationAt: "2023-01-03T16:51:33.000Z",
			updatedAt: "2023-01-03T16:51:33.000Z",
		};

		mockedAxios.post.mockResolvedValueOnce({data});

		await expect(addProduct(payload)).resolves.toEqual(data);
		expect(mockedAxios.post).toHaveBeenCalledWith(PRODUCT_API_URL, payload);
	});

	it("throws API message when axios error has response message", async () => {
		mockedAxios.post.mockRejectedValueOnce({
			isAxiosError: true,
			response: {data: {message: "Validation failed"}},
		});

		await expect(addProduct(payload)).rejects.toThrow("Validation failed");
	});

	it("throws default message when axios error has no response message", async () => {
		mockedAxios.post.mockRejectedValueOnce({
			isAxiosError: true,
			message: "Network error",
			response: {data: {}},
		});

		await expect(addProduct(payload)).rejects.toThrow("Failed to add product");
	});

	it("throws unexpected error message for non-axios errors", async () => {
		mockedAxios.post.mockRejectedValueOnce(new Error("Boom"));

		await expect(addProduct(payload)).rejects.toThrow(
			"An unexpected error occurred"
		);
	});
});
