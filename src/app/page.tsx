"use client";

import {useEffect, useState} from "react";
import ProductCard from "../components/ProductCard";
import {productService} from "@/services/product.service";
import {Product} from "@/types/product.types";

export default function Home() {
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				setIsLoading(true);
				const data = await productService.getAllProducts();
				setProducts(data);
			} catch (err) {
				setError(
					err instanceof Error
						? err.message
						: "An unknown error occurred"
				);
			} finally {
				setIsLoading(false);
			}
		};

		fetchProducts();
	}, []);

	return (
		<div className="min-h-screen bg-surface px-4 py-12 sm:px-8">
			<header className="mb-16 text-center">
				<h1 className="font-bricolage text-4xl font-black tracking-tight text-on-surface sm:text-6xl">
					Our Collection
				</h1>
				<p className="mt-4 text-on-surface-variant">
					Discover our curated selection of premium products.
				</p>
			</header>

			<main className="mx-auto max-w-7xl">
				<div id={"list-control"} className={"flex flex-row w-full space-between"}>
				</div>

				{/*loading state*/}
				{isLoading && (
					<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						{Array.from({length: 8}).map((_, i) => (
							<div
								key={i}
								className="h-96 animate-pulse rounded-2xl bg-zinc-200"
							/>
						))}
					</div>
				)}

				{/*error state ui*/}
				{error && (
					<div className="py-20 text-center">
						<h2 className="text-2xl font-bold text-zinc-800">
							Oops! Something went wrong.
						</h2>
						<p className="mt-2 text-zinc-500">{error}</p>
					</div>
				)}

				{/*rendered ui*/}
				{!isLoading && !error && (
					<section id="product-grid"
					         className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						{products.map((product) => (
							<ProductCard key={product.id} product={product}/>
						))}
					</section>
				)}
			</main>
		</div>
	);
}