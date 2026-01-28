"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import ProductCard from "@/component/ProductCard";
import { ProductDetail } from "@/types";
import Filter from "@/component/Filter";

export const dynamic = "force-dynamic";

export default function Home() {
	const [products, setProducts] = useState<ProductDetail[]>([]);
	const [page, setPage] = useState(0);
	const [hasMore, setHasMore] = useState(true);
	const limit = 12;
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const loaderRef = useRef<HTMLDivElement>(null);

	const fetchProducts = useCallback(
		async (signal: AbortSignal) => {
			try {
				setIsLoading(true);
				setError(null);

				const res = await fetch(
					`https://api.escuelajs.co/api/v1/products?offset=${page * limit}&limit=${limit}`,
					{ signal },
				);

				const data: ProductDetail[] = await res.json();
				setProducts((prev) => [...prev, ...data]);
				if (data.length < limit) {
					setHasMore(false);
				}
			} catch (err) {
				if (err instanceof DOMException && err.name === "AbortError") {
					return;
				}

				setError(
					err instanceof Error
						? err.message
						: "An unknown error occurred",
				);
			} finally {
				setIsLoading(false);
			}
		},
		[page],
	);

	useEffect(() => {
		const controller = new AbortController();
		if (hasMore) {
			fetchProducts(controller.signal);
		}
		return () => {
			controller.abort();
		};
	}, [fetchProducts, hasMore]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				const target = entries[0];
				if (target.isIntersecting && hasMore && !isLoading) {
					setPage((prevPage) => prevPage + 1);
				}
			},
			{ rootMargin: "200px" },
		);

		const currentLoaderRef = loaderRef.current;
		if (currentLoaderRef) {
			observer.observe(currentLoaderRef);
		}

		return () => {
			if (currentLoaderRef) {
				observer.unobserve(currentLoaderRef);
			}
		};
	}, [hasMore, isLoading]);

	return (
		<div className="min-h-screen bg-zinc-50 px-4 py-12 sm:px-8">
			<header className="mb-16 text-center">
				<h1 className="text-9xl font-bricolage font-semibold tracking-tight text-zinc-900">
					Whereas disregard and contempt for human rights have
					resulted
				</h1>
				<p className="mt-4 font-bricolage text-zinc-500">
					Discover our curated selection of premium products.
				</p>
			</header>
			<div className="flex flex-row w-full justify-end gap-2">
				<Filter />
			</div>

			<main className="mx-auto max-w-8xl">
				{isLoading && products.length === 0 && (
					<div className="grid gap-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
						{[...Array(8)].map((_, i) => (
							<div
								key={i}
								className="h-96 animate-pulse rounded-2xl bg-zinc-200"
							/>
						))}
					</div>
				)}

				{error && (
					<div className="flex flex-col items-center justify-center py-20 text-center">
						<div className="mb-4 text-6xl text-zinc-300">⚠️</div>
						<h2 className="text-2xl font-bold text-zinc-800">
							Oops! Something went wrong.
						</h2>
						<p className="mt-2 text-zinc-500">{error}</p>
						<button
							onClick={() => window.location.reload()}
							className="mt-6 rounded-full bg-indigo-600 px-8 py-3 font-bold text-white transition-all hover:bg-indigo-700 active:scale-95"
						>
							Try Again
						</button>
					</div>
				)}

				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{products.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>

				{isLoading && products.length > 0 && (
					<div className="text-center py-4">Loading...</div>
				)}

				<div ref={loaderRef}></div>
			</main>

			<footer className="mt-24 border-t border-zinc-200 py-12 text-center text-sm text-zinc-400">
				Built for Milestone 3 Demo • Data from Platzi Fake Store API
			</footer>
		</div>
	);
}
