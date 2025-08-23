"use server";
import { stripe } from "@/lib/stripe";
import type Stripe from "stripe";
import type { CartItem } from "@/store/cart-store";
import { redirect } from "next/navigation";

export const checkoutAction = async (formData: FormData): Promise<void> => {
    // Expect a JSON string of CartItem[] under the "items" field
    const itemsRaw = formData.get("items") as string;
    if (typeof itemsRaw !== "string") throw new Error("Missing items");

    let items: CartItem[];
    try {
        items = JSON.parse(itemsRaw) as CartItem[];
    } catch {
        throw new Error("Invalid items");
    }
    if (!Array.isArray(items) || items.length === 0) throw new Error("No items");

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map(
        (item) => {
            // Store uses display units (Rs). Convert to the smallest currency unit (paise).
            const unitAmount = Math.round(item.price * 100);
            return {
                price_data: {
                    currency: "inr",
                    product_data: { name: item.name },
                    unit_amount: unitAmount,
                },
                quantity: Math.max(1, item.quantity || 1),
            };
        }
    );

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
    const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        line_items,
        success_url: `${baseUrl}/success`,
        cancel_url: `${baseUrl}/cancel`,
    });

    if (session.url) redirect(session.url);
    throw new Error("Failed to create checkout session");
}; 