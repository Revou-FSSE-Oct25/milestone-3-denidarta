"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ProductDetail } from "@/types";
import Button from "@/component/Button";

const ProductCard: React.FC<{ product: ProductDetail }> = ({ product }) => {
	const [imgError, setImgError] = React.useState(false);
	const router = useRouter();
	const isClicked = () => {
		router.push(`/product/${product.id}`);
	};

	return (
		<div
			onClick={isClicked}
			className="cursor-pointer group relative overflow-hidden bg-white border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl rounded-[40px]"
		>
			<div className="relative aspect-square overflow-hidden">
				{product.images?.[0] && !imgError ? (
					<Image
						src={product.images[0]}
						alt={product.title}
						fill
						style={{ objectFit: "cover" }}
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						onError={() => setImgError(true)}
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
					<Button
						onClick={(e) => {
							e.stopPropagation();
							console.log("Added to cart:", product.title);
						}}
					>
						Add to Cart
					</Button>
				</div>
			</div>

			<div className="p-6">
				<div className="mb-2 flex items-center justify-between">
					<h3 className="line-clamp-1 text-lg font-bold text-zinc-800">
						{product.title}
					</h3>
					<span
						id="price-tag"
						className="text-xl text-emerald-500 font-black"
					>
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
