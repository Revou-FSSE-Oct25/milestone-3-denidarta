"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../component/ProductCard";
import { ProductDetail } from "../types";

export default function Home() {
	const [products, setProducts] = useState<ProductDetail[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				setIsLoading(true);
				const result = await axios.get<ProductDetail[]>(
					"https://api.escuelajs.co/api/v1/products",
				);
				setProducts(result.data);
			} catch (err: unknown) {
				setError(
					err instanceof Error
						? err.message
						: "An unknown error occurred",
				);
			} finally {
				setIsLoading(false);
			}
		};

		fetchProducts();
	}, []);

	return (
		<div className="min-h-screen bg-zinc-50 px-4 py-12 font-sans dark:bg-black sm:px-8">
			<header className="mb-16 text-center">
				<h1 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-6xl">
					Our <span className="text-indigo-600">Collection</span>
				</h1>
				<p className="mt-4 text-zinc-500 dark:text-zinc-400">
					Discover our curated selection of premium products.
				</p>
			</header>

			<main className="mx-auto max-w-7xl">
				{isLoading && (
					<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						{[...Array(8)].map((_, i) => (
							<div
								key={i}
								className="h-96 animate-pulse rounded-2xl bg-zinc-200 dark:bg-zinc-800"
							/>
						))}
					</div>
				)}

				{error && (
					<div className="flex flex-col items-center justify-center py-20 text-center">
						<div className="mb-4 text-6xl text-zinc-300">⚠️</div>
						<h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-200">
							Oops! Something went wrong.
						</h2>
						<p className="mt-2 text-zinc-500 dark:text-zinc-400">
							{error}
						</p>
						<button
							onClick={() => window.location.reload()}
							className="mt-6 rounded-full bg-indigo-600 px-8 py-3 font-bold text-white transition-all hover:bg-indigo-700 active:scale-95"
						>
							Try Again
						</button>
					</div>
				)}

				{!isLoading && !error && (
					<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						{products.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
					</div>
				)}
			</main>

			<footer className="mt-24 border-t border-zinc-200 py-12 text-center text-sm text-zinc-400 dark:border-zinc-800">
				Built for Milestone 3 Demo • Data from Platzi Fake Store API
			</footer>
		</div>
	);
}
