"use client";

import useCart from "@/hooks/useCart";
import Button from "@/components/Button";
import {handleAddToCart} from "@/lib/transactions/handleAddToCart";
import {useState} from "react";
import {Product} from "@/types/product.types";

interface AddToCartButtonProps {
	product: Product;
	className?: string;
}

export default function AddToCartButton({product, className}: AddToCartButtonProps) {
	const {add} = useCart();
	const [isAdded, setIsAdded] = useState(false);
	const onAdd = () => handleAddToCart({product, add, setIsAdded});


	return (
		<Button
			variant={"primary"}
			className={`${className} rounded-none uppercase tracking-widest py-6`}
			onClick={onAdd}
			disabled={isAdded}
		>
			{isAdded ? "Added!" : "Add to Cart"}
		</Button>
	);
}
