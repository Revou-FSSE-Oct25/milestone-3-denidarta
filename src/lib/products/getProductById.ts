import { ProductDetail } from "@/types/types";

export async function getProductById(productId: string): Promise<ProductDetail | null> {
    if (!productId || isNaN(Number(productId))) {
        return null;
    }

    const res = await fetch(
        `https://api.escuelajs.co/api/v1/products/${productId}`,
        { cache: "no-store" }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch product");
    }

    const product: ProductDetail = await res.json();

    // Sanitize image URLs (Platzi API often returns them as ["[\"url\"]"] strings)
    if (product.images) {
        product.images = product.images.map((image: string) =>
            image.replace(/[\[\]"]/g, "").trim()
        );
    }

    return product;
}
