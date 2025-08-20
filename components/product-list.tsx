"use client";
import type Stripe from "stripe"
import { ProductCard } from "./product-card";
import { useState } from "react";

interface Props {
    products: Stripe.Product[];
}

export const ProductList = ({ products }: Props) => {
    const [searchTerm, setsearchTerm] = useState<string>("")
    const filteredProd = products.filter((product) => {
        const term = searchTerm.toLowerCase()
        const nameMatch = product.name.toLowerCase().includes(term)
        const descMatch = product.description ? product.description.toLowerCase().includes(term) : false
        return nameMatch || descMatch ;
    })
    return (
        <div>
            <div className="flex justify-center mb-4">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e)=>setsearchTerm(e.target.value)} 
                    placeholder="Search products..."
                    className="w-full max-w-md rounded-md border px-4 py-2 text-sm outline-none focus:ring-[3px] focus:ring-ring/50"
                    suppressHydrationWarning
                />
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProd.map((product) => {
                    return (
                        <li key={product.id}>
                            <ProductCard product={product} />
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}