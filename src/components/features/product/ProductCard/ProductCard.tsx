'use client';

import React, {useState} from 'react';
import {useRouter} from 'next/navigation';
import Image from 'next/image';

import {Product} from '@/types/Product.types';


const ProductCard: React.FC<{ product: Product }> = ({product}) => {
	const router = useRouter ();
	const [imageError, setImageError] = useState (false);
	const handleCardClick = () => {
		router.push (`/product/${product.id}`);
	};
	
	return (
		<div
			onClick={handleCardClick}
			className="cursor-pointer group flex flex-col relative overflow-hidden bg-surface-container-low border border-outline-variant rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:bg-surface-container hover:border-outline">
			<div id="product-image" className="relative aspect-square overflow-hidden">
				{product.images?.[0] && !imageError ? (
					
					<Image
						src={product.images[0]}
						alt={product.title}
						fill
						style={{objectFit: 'cover'}}
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						priority
						unoptimized={true}
						onError={() => setImageError (true)}
					/>
				
				) : (
					<div
						className="flex h-full w-full items-center justify-center bg-surface-variant text-on-surface-variant">
						No Image
					</div>
				)}
				
				<div id="category-badge"
				     className="absolute top-4 left-4 rounded-full bg-secondary px-4 py-1.5 text-xs font-semibold text-on-secondary backdrop-blur-md">
					{product.category.name}
				</div>
			</div>
			
			<div className="p-6 flex flex-col grow">
				<div className="mb-auto flex items-center justify-between">
					<h3 className="line-clamp-2 text-lg font-bold text-on-surface transition-colors group-hover:text-secondary">
						{product.title}
					</h3>
					<span className="text-xl font-black text-secondary">
						${product.price}
					</span>
				</div>
				
				<p className="line-clamp-2 text-sm text-on-surface-variant">
					{product.description}
				</p>
			</div>
		</div>
	);
};

export default ProductCard;
