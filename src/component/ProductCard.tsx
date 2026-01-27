"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ProductDetail } from "@/types";

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
			<div className="relative aspect-square overflow-hidden">
				{product.images?.[0] ? (
					<Image
						src={product.images[0]}
						alt={product.title}
						fill
						style={{ objectFit: "cover" }}
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						priority
					/>
				) : (
					<div className="flex h-full w-full items-center justify-center bg-zinc-200 text-zinc-500 dark:bg-zinc-800">
						No Image
					</div>
				)}

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
			</div>
		</div>
	);
};

export default ProductCard;
