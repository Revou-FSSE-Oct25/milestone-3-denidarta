import { ProductDetail, ProductCategory, User } from "@/types/types";

const API_BASE_URL = "https://api.escuelajs.co/api/v1";
const API_CATEGORY = "https://api.escuelajs.co/api/v1/categories";
const API_USER = "https://api.escuelajs.co/api/v1/users";

interface ProductService {
  getAllProducts: () => Promise<ProductDetail[]>;
  getProductById: (id: string) => Promise<ProductDetail>;
  getProductsByCategory: (categoryId: number) => Promise<ProductDetail[]>;
  getProductCategories: (id: number) => Promise<ProductCategory[]>;
  getUsers: (id:number) => Promise<User[]>;
  getUsersByID: (id:number) => Promise<User[]>;
}

export const productService: ProductService = {
  /**
   * Fetch all products
   */
  getAllProducts: async (): Promise<ProductDetail[]> => {
    const res = await fetch(`${API_BASE_URL}/products`);
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  },
  /**
   * Fetch a single product by ID
   */
  getProductById: async (id: string): Promise<ProductDetail> => {
    const res = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!res.ok) throw new Error("Failed to fetch product");
    return res.json();
  },
  /**
   * Fetch products by category
   */
  getProductsByCategory: async (categoryId: number): Promise<ProductDetail[]> => {
    const res = await fetch(`${API_BASE_URL}/categories/${categoryId}/products`);
    if (!res.ok) throw new Error("Failed to fetch category products");
    return res.json();
  },

  getProductCategories: async (): Promise<ProductCategory[]> => {
    const res : Response = await fetch (`${API_CATEGORY}`);
    if (!res.ok) throw new Error("Failed to fetch categories");
    return res.json();
  },

  getUsers: async (): Promise<User[]> => {
    const res : Response = await fetch (`${API_USER}`);
    if (!res.ok) throw new Error ("Failed to fetch user");
    return res.json();
  },
};

