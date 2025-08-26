import Link from "next/link";
import type Stripe from "stripe"
import { Card, CardTitle, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import Image from "next/image";
import { useCartStore } from "@/store/cart-store";


interface Props {
    product: Stripe.Product;
}

export const ProductCard = ({ product }: Props) => {
    const price = product.default_price as Stripe.Price;
    const qty = useCartStore(
        (s) => s.items.find((i) => i.id === product.id)?.quantity ?? 0
    );
    const addItem = useCartStore((s) => s.addItem);
    const increment = useCartStore((s) => s.increment);
    const decrement = useCartStore((s) => s.decrement);

    return (
        <Card className="rounded-xl border border-gray-200 shadow-sm hover:shadow transition">
            {product.images?.[0] && (
                <div className="relative w-full aspect-[16/9] overflow-hidden rounded-t-xl">
                    <Image
                        alt={product.name}
                        src={product.images[0]}
                        fill
                        sizes="(max-width: 640px) 100vw, 600px"
                        className="object-cover transition-transform duration-300 ease-in-out hover:scale-[1.02]"
                        priority
                    />
                </div>
            )}
            <CardContent className="pt-0">
                <CardTitle className="text-base sm:text-lg">{product.name}</CardTitle>
                {product.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {product.description}
                    </p>
                )}
                {price?.unit_amount && (
                    <p className="font-semibold mb-2">Rs {(price.unit_amount / 100).toFixed(2)}</p>
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
            </CardContent>
            <CardFooter>
                <Link href={`/products/${product.id}`}>
                    <Button className="w-full">View Details</Button>
                </Link>
            </CardFooter>
        </Card>
    )
}