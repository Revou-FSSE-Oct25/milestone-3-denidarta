import {productService} from "@/services/product.service";
import {Product} from "@/types/product.types";

export async function getProductById(productId: string): Promise<Product | null> {
	try {
		const fetchedProduct = await productService.getProductById(productId);
		return fetchedProduct;
	} catch {
		return null;
	}
}
