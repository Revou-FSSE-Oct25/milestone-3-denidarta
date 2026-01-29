"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ProductDetail } from "@/types";
import Button from "@/component/Button";


const ProductCard: React.FC<{ product: ProductDetail }> = ({ product }) => {
	const router = useRouter();

	const handleCardClick = () => {
		router.push(`/product/${product.id}`);
	};

	// TODO : Remove dark mode option in this code

	return (
		<div
			onClick={handleCardClick}
			className="cursor-pointer group relative overflow-hidden bg-white border rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
		>
			<div id="product-image" className="relative aspect-square overflow-hidden">
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

				<div id="category-badge" className="absolute top-4 left-4 rounded-full border border-white/20 bg-white/30 px-4 py-1.5 text-xs font-semibold text-zinc-900 backdrop-blur-md dark:border-zinc-700/30 dark:bg-black/40 dark:text-zinc-100">
					{product.category.name}
				</div>

					<Button
						onClick={(e) => {
							e.stopPropagation();
							console.log("Added to cart:", product.title);
						}}
						size={"lg"}
						variant={"onDark"}
						className={"w-full absolute inset-x-0 bottom-0 translate-y-full p-4 transition-transform duration-500 group-hover:translate-y-40"}
					>
						Add to Cart
					</Button>

			</div>

			<div className="p-6">
				<div className="mb-2 flex items-center justify-between">
					<h3 className="line-clamp-1 text-lg font-bold text-zinc-800 transition-colors group-hover:text-indigo-600">
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
