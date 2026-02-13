import {Product} from "@/types/product.types";
import {ShoppingCart} from "@/types/shoppingCart";

export interface AddToCartOptions {
	product: Product;
	add: (item: Omit<ShoppingCart, "quantity">) => void;
	setIsAdded: (value: boolean) => void;
}

export const handleAddToCart = ({product, add, setIsAdded}: AddToCartOptions) => {
	add({
		id: product.id,
		title: product.title,
		price: product.price,
		image: product.images?.[0] ?? "/placeholder-image.png",
	});
	setIsAdded(true);
	setTimeout(() => setIsAdded(false), 2000);
};
