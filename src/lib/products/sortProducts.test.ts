import {sortProducts} from "@/lib/products/sortProducts";
import {Product} from "@/types/product.types";

const mockProducts: Product[] = [
	{
		id: 1,
		title: "Banana",
		price: 200,
		creationAt: "2024-01-10",
		slug: "",
		category: {
			id: 1,
			name: "",
			slug: "",
			image: "",
			creationAt: "",
			updatedAt: "",
		},
		images: [],
		updatedAt: ""
	},
	{
		id: 2,
		title: "Apple",
		price: 100,
		creationAt: "2024-01-01",
		slug: "",
		category: {
			id: 1,
			name: "",
			slug: "",
			image: "",
			creationAt: "",
			updatedAt: "",
		},
		images: [],
		updatedAt: ""
	},
	{
		id: 3,
		title: "Carrot",
		price: 300,
		creationAt: "2024-02-01",
		slug: "",
		category: {
			id: 1,
			name: "",
			slug: "",
			image: "",
			creationAt: "",
			updatedAt: "",
		},
		images: [],
		updatedAt: ""
	},
];

describe("sortProducts", () => {
	it("sorts by price ascending", () => {
		const result = sortProducts(mockProducts, "price", "asc");
		expect(result.map(p => p.price)).toEqual([100, 200, 300]);
	});

	it("sorts by name ascending", () => {
		const result = sortProducts(mockProducts, "name", "asc");
		expect(result.map(p => p.title)).toEqual(["Apple", "Banana", "Carrot"]);
	});

	it("sorts by date descending", () => {
		const result = sortProducts(mockProducts, "date", "desc");
		expect(result[0].title).toBe("Carrot");
	});

	it("does not mutate original array", () => {
		sortProducts(mockProducts, "price");
		expect(mockProducts[0].title).toBe("Banana");
	});
});
