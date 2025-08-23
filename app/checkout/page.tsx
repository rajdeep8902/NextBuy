"use client";
import { useCartStore } from "@/store/cart-store";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";
import { checkoutAction } from "./checkout-action";

export default function CheckoutPage() {
    const items = useCartStore((s) => s.items);
    const removeItem = useCartStore((s) => s.removeItem);
    const increment = useCartStore((s) => s.increment);
    const decrement = useCartStore((s) => s.decrement);

    const total = useMemo(
        () => items.reduce((acc, item) => acc + item.price * item.quantity, 0),
        [items]
    );

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-semibold">Your Cart is empty</h1>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-semibold mb-4">Checkout</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="divide-y">
                        {items.map((item) => (
                            <li key={item.id} className="py-4 flex items-center gap-4">
                                {item.imageUrl && (
                                    <div className="relative w-16 h-16 rounded overflow-hidden">
                                        <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                                    </div>
                                )}
                                <div className="flex-1">
                                    <div className="font-medium">{item.name}</div>
                                    <div className="text-sm text-muted-foreground">Qty: {item.quantity}</div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="icon" onClick={() => decrement(item.id)}>-</Button>
                                    <span className="w-8 text-center">{item.quantity}</span>
                                    <Button variant="outline" size="icon" onClick={() => increment(item.id)}>+</Button>
                                </div>
                                <div className="w-24 text-right font-medium">Rs {(item.price * item.quantity).toFixed(2)}</div>
                                <Button variant="ghost" onClick={() => removeItem(item.id)}>Remove</Button>
                            </li>
                        ))}
                    </ul>
                </CardContent>
                <CardFooter className="flex items-center justify-end gap-6">
                    <div className="text-lg font-semibold">Total: Rs {total.toFixed(2)}</div>
                    <form action={checkoutAction}>
                        <input type="hidden" name="items" value={JSON.stringify(items)} />
                        <Button>Proceed to Payment</Button>
                    </form>
                </CardFooter>
            </Card>
        </div>
    )
}