// addProduct.test.ts

import axios from "axios";
import {addProduct} from "./product.service";
import {PRODUCT_API_URL} from "@/constants";
import {AddProductPayload, Product} from "@/types/product.types";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("addProduct", () => {
	const payload: AddProductPayload = {
		title: "New Product",
		price: 10,
		description: "A description",
		categoryId: 1,
		images: ["https://placehold.co/600x400"],
	};

	const mockResponse: Product = {
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

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should successfully add product and return data", async () => {
		mockedAxios.post.mockResolvedValueOnce({data: mockResponse});

		const result = await addProduct(payload);

		expect(mockedAxios.post).toHaveBeenCalledWith(
			PRODUCT_API_URL,
			payload
		);

		expect(result).toEqual(mockResponse);
	});

	it("should throw unexpected error for non-axios errors", async () => {
		mockedAxios.post.mockRejectedValueOnce(new Error("Unknown"));

		await expect(addProduct(payload)).rejects.toThrow("Unexpected error");
	});
});