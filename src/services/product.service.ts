import { Product, ProductCategory } from "@/types/product.types";
import { User } from "@/types/user.types";

const API_BASE_URL = "https://api.escuelajs.co/api/v1";
const API_CATEGORY = "https://api.escuelajs.co/api/v1/categories";
const API_USER = "https://api.escuelajs.co/api/v1/users";

interface ProductService {
	getAllProducts: () => Promise<Product[]>;
	getProductById: (id: string) => Promise<Product>;
	getProductsByCategory: (categoryId: number) => Promise<Product[]>;
	getProductCategories: () => Promise<ProductCategory[]>;
	getUsers: () => Promise<User[]>;
}

export const productService: ProductService = {
	getAllProducts: async (): Promise<Product[]> => {
		const res = await fetch(`${API_BASE_URL}/products`);
		if (!res.ok) throw new Error("Failed to fetch products");
		return res.json();
	},

	getProductById: async (id: string): Promise<Product> => {
		const res = await fetch(`${API_BASE_URL}/products/${id}`);

		if (!res.ok) {
			throw new Error(`Failed to fetch product with id ${id}`);
		}

		return res.json();
	},

	getProductsByCategory: async (categoryId: number): Promise<Product[]> => {
		const res = await fetch(
			`${API_BASE_URL}/categories/${categoryId}/products`,
		);
		if (!res.ok) throw new Error("Failed to fetch category products");
		return res.json();
	},

	getProductCategories: async (): Promise<ProductCategory[]> => {
		const res: Response = await fetch(`${API_CATEGORY}`);
		if (!res.ok) throw new Error("Failed to fetch categories");
		return res.json();
	},

	getUsers: async (): Promise<User[]> => {
		const res: Response = await fetch(`${API_USER}`);
		if (!res.ok) throw new Error("Failed to fetch user");
		return res.json();
	},
};
