import {
  AddProductPayload,
  Product,
  ProductCategory,
} from "@/types/Product.types";
import { CATEGORY_API_URL, PRODUCT_API_URL } from "@/constants/API_CONSTANTS";
import axios from "axios";
import AddProductForm from "@/components/features/product/AddProductForm";

interface ProductService {
  getAllProducts: () => Promise<Product[]>;
  getProductById: (id: string) => Promise<Product>;
  getProductsByCategory: (categoryId: number) => Promise<Product[]>;
  getProductCategories: () => Promise<ProductCategory[]>;
  addProduct: (payload: AddProductPayload) => Promise<Product>;
}

export const addProduct = async (
  payload: Pick<Product, "title" | "description" | "price" | "categoryId">,
): Promise<Product> => {
  try {
    const response = await axios.post(PRODUCT_API_URL, payload);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }
    throw new Error("Unexpected error");
  }
};

export const fetchService: ProductService = {
  getAllProducts: async (): Promise<Product[]> => {
    const res = await fetch(PRODUCT_API_URL);
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  },

  getProductById: async (id: string): Promise<Product> => {
    const res = await fetch(`${PRODUCT_API_URL}/${id}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch product with id ${id}`);
    }
    return res.json();
  },

  getProductsByCategory: async (categoryId: number): Promise<Product[]> => {
    const res = await fetch(`${CATEGORY_API_URL}/${categoryId}/products`);
    if (!res.ok) throw new Error("Failed to fetch category products");
    return res.json();
  },

  getProductCategories: async (): Promise<ProductCategory[]> => {
    const res: Response = await fetch(CATEGORY_API_URL);
    if (!res.ok) throw new Error("Failed to fetch categories");
    return res.json();
  },
  addProduct,
};
