"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ProductDetail } from "@/app/types/types";

const ProductCard: React.FC<{ product: ProductDetail }> = ({ product }) => {
	const router = useRouter();

	const handleCardClick = () => {
		router.push(`/product/${product.id}`);
	};

	return (
		<div
			onClick={handleCardClick}
			className="cursor-pointer group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl dark:bg-zinc-900"
		>
			{/* Image Container */}
			<div className="relative aspect-square overflow-hidden">
				{product.images?.[0] ? (
					<Image // Replaced <img> with <Image />
						src={product.images[0]}
						alt={product.title}
						fill // Fills the parent container
						style={{ objectFit: "cover" }}
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Responsive sizes
						priority
					/>
				) : (
					<div className="flex h-full w-full items-center justify-center bg-zinc-200 text-zinc-500 dark:bg-zinc-800">
						No Image
					</div>
				)}

				{/* Category Badge - Glassmorphism */}
				<div className="absolute top-4 left-4 rounded-full border border-white/20 bg-white/30 px-4 py-1.5 text-xs font-semibold text-zinc-900 backdrop-blur-md dark:border-zinc-700/30 dark:bg-black/40 dark:text-zinc-100">
					{product.category.name}
				</div>

				<div className="absolute inset-x-0 bottom-0 translate-y-full p-4 transition-transform duration-500 group-hover:translate-y-0">
					<button
						onClick={(e) => {
							e.stopPropagation();
							console.log("Added to cart:", product.title);
						}}
						className="w-full rounded-xl bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 py-3 font-bold text-white shadow-xl transition-all hover:brightness-110 active:scale-95"
					>
						Add to Cart
					</button>
				</div>
			</div>

			{/* Content */}
			<div className="p-6">
				<div className="mb-2 flex items-center justify-between">
					<h3 className="line-clamp-1 text-lg font-bold text-zinc-800 transition-colors group-hover:text-indigo-600 dark:text-zinc-100 dark:group-hover:text-indigo-400">
						{product.title}
					</h3>
					<span className="text-xl font-black text-transparent bg-clip-text bg-linear-to-r from-indigo-500 to-purple-500">
						${product.price}
					</span>
				</div>

				<p className="line-clamp-2 text-sm text-zinc-500 dark:text-zinc-400">
					{product.description}
				</p>

				<div className="mt-4 flex items-center gap-1">
					{[...Array(5)].map((_, i) => (
						<svg
							key={i}
							className={`h-4 w-4 ${i < 4 ? "text-yellow-400" : "text-zinc-300 dark:text-zinc-700"}`}
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
						</svg>
					))}
					<span className="ml-2 text-xs text-zinc-400">
						4.0 / 5.0
					</span>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
