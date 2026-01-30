"use client";

import { useEffect, useState } from "react";
import { ShoppingCart } from "@/types";
import {
    addToCart,
    removeFromCart,
    updateQuantity,
} from "@/lib/transactions/shoppingCart";

const CART_KEY = "shopping-cart";

function useCart() {
    const [cart, setCart] = useState<ShoppingCart[]>([]);

    // load once on client
    useEffect(() => {
        const raw = localStorage.getItem(CART_KEY);
        if (raw) {
            setCart(JSON.parse(raw) as ShoppingCart[]);
        }
    }, []);

    // persist on every change
    useEffect(() => {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }, [cart]);

    return {
        cart,
        add(item: Omit<ShoppingCart, "quantity">) {
            setCart(c => addToCart(c, item));
        },
        remove(id: number) {
            setCart(c => removeFromCart(c, id));
        },
        update(id: number, quantity: number) {
            setCart(c => updateQuantity(c, id, quantity));
        },
    };
}

export default useCart
