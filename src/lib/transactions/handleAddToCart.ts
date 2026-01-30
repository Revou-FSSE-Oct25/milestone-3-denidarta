import { ProductDetail, ShoppingCart } from "@/types";

export interface AddToCartOptions {
    product: ProductDetail;
    add: (item: Omit<ShoppingCart, "quantity">) => void;
    setIsAdded: (value: boolean) => void;
}

export const handleAddToCart = ({ product, add, setIsAdded }: AddToCartOptions) => {
    add({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.images?.[0] || "",
    });

    // Flash feedback
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
};
