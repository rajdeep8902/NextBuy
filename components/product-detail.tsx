"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import { useCartStore } from "@/store/cart-store";

interface Props {
    product: {
        id: string;
        name: string;
        description: string | null;
        images: string[];
        price: { unit_amount: number | null; currency: string } | null;
    };
}

export default function ProductDetail({ product }: Props) {
    const price = product.price;
    // Bind to cart store
    const qty = useCartStore(
        (s) => s.items.find((i) => i.id === product.id)?.quantity ?? 0
    );
    const addItem = useCartStore((s) => s.addItem);
    const increment = useCartStore((s) => s.increment);
    const decrement = useCartStore((s) => s.decrement);

    return (
        <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Image left */}
            <div className="w-full flex justify-center">
                {product.images?.[0] && (
                    <div className="relative w-full max-w-md aspect-[4/5] overflow-hidden rounded-xl">
                        <Image
                            alt={product.name}
                            src={product.images[0]}
                            fill
                            sizes="(max-width: 768px) 100vw, 480px"
                            className="object-cover"
                            priority
                        />
                    </div>
                )}
            </div>

            {/* Details right */}
            <div className="space-y-3">
                <h1 className="text-2xl sm:text-3xl font-bold">{product.name}</h1>
                {product.description && (
                    <p className="text-sm text-muted-foreground max-w-prose">
                        {product.description}
                    </p>
                )}
                {price?.unit_amount && (
                    <p className="text-lg font-semibold">Rs {(price.unit_amount / 100).toFixed(2)}</p>
                )}

                <div className="flex items-center gap-3 pt-2">
                    <Button
                        variant="outline"
                        size="icon"
                        aria-label="Decrease"
                        onClick={() => {
                            if (qty > 0) decrement(product.id);
                        }}
                        disabled={qty === 0}
                    >
                        -
                    </Button>
                    <span className="w-9 h-9 grid place-items-center rounded-md border text-sm font-medium select-none">{qty}</span>
                    <Button
                        variant="outline"
                        size="icon"
                        aria-label="Increase"
                        onClick={() => {
                            if (!price?.unit_amount) return;
                            if (qty === 0) {
                                addItem({
                                    id: product.id,
                                    name: product.name,
                                    price: Number((price.unit_amount / 100).toFixed(2)),
                                    imageUrl: product.images?.[0] ?? null,
                                    quantity: 1,
                                });
                            } else {
                                increment(product.id);
                            }
                        }}
                    >
                        +
                    </Button>
                </div>
            </div>
        </div>
    )
}