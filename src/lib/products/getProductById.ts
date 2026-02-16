import {fetchService} from '@/services/product.service';
import {Product} from '@/types/Product.types';

export async function getProductById (productId: string): Promise<Product | null> {
	try {
		return await fetchService.getProductById (productId);
	} catch {
		return null;
	}
}
