"use client"
import Stripe from "stripe"
import { Card, CardContent, CardTitle } from "./ui/card"
import { useState, useEffect } from "react"
import Image from "next/image"

interface Props {
    products: Stripe.Product[];
}

export const Carousel = ({ products }: Props) => {
    const [current, setcurrent] = useState<number>(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setcurrent((prev) => (prev + 1) % products.length);
        }, 3000);
        return () => clearInterval(interval)
    }, [products.length]);

    const currentProd = products[current];
    const price = currentProd.default_price as Stripe.Price;

    return <Card className="relative overflow-hidden rounded-lg shadow-md border-gray-300">
        {currentProd.images && currentProd.images[0] && (
            <div className="relative h-80 w-full">
                <Image alt={currentProd.name}
                    src={currentProd.images[0]}
                    layout="fill"
                    objectFit="cover"
                    className="transition-opacity duration-500 ease-in-out" />
            </div>
        )}
        <CardContent className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity">
            <CardTitle className="text-3xl font-bold text-white mb-2">
                {currentProd.name}
            </CardTitle>
            {price && price.unit_amount && <p>Rs {(price.unit_amount / 100).toFixed(2)}</p>}
        </CardContent>
    </Card>
}