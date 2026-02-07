import {productService} from "@/services/product.service";
import {Product} from "@/types/product.types";

export async function getProductById(productId: string): Promise<Product | null> {
	try {
		return await productService.getProductById(productId);
	} catch {
		return null;
	}
}
