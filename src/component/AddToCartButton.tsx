"use client";

import useCart from "@/hooks/useCart";
import Button from "./Button";
import { ProductDetail } from "@/types/types";
import { handleAddToCart } from "@/lib/transactions/handleAddToCart";
import { useState } from "react";

interface AddToCartButtonProps {
    product: ProductDetail;
    className?: string; // Allow passing className for layout
}

export default function AddToCartButton({ product, className }: AddToCartButtonProps) {
    const { add } = useCart();
    const [isAdded, setIsAdded] = useState(false);

    const onAdd = () => handleAddToCart({ product, add, setIsAdded });


    return (
        <Button
            size="lg"
            className={`${className} rounded-none uppercase tracking-widest py-6`}
            onClick={onAdd}
            disabled={isAdded}
        >
            {isAdded ? "Added!" : "Add to Cart"}
        </Button>
    );
}
