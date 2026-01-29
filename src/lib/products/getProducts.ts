import {ProductDetail} from "@/types";

export async function getProducts(): Promise<ProductDetail[]> {
    console.log('getProducts() Running')
    const res = await fetch('https://api.escuelajs.co/api/v1/products', {
        cache: 'no-store',
    })
    if (!res.ok) {
        throw new Error('Failed to fetch products')
    }
    return res.json()
}