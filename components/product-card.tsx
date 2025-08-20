import Link from "next/link";
import type Stripe from "stripe"
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import Image from "next/image";


interface Props {
    product: Stripe.Product;
}

export const ProductCard = ({ product }: Props) => {
    const price = product.default_price as Stripe.Price;

    return (
        <Link href={"/products/1"}>
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
                <CardHeader className="pb-2">
                    <CardTitle className="text-base sm:text-lg">{product.name}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                    {product.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                            {product.description}
                        </p>
                    )}
                    {price?.unit_amount && (
                        <p className="font-semibold mb-2">Rs {(price.unit_amount / 100).toFixed(2)}</p>
                    )}
                    <Button className="w-full">View Details</Button>
                </CardContent>
            </Card>
        </Link>
    )
}