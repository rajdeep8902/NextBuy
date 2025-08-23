import { stripe } from "@/lib/stripe"
import ProductDetail from "@/components/product-detail"
import type Stripe from "stripe";

export default async function ProductPage({ params }: { params: { id: string } }) {
    const product = await stripe.products.retrieve(params.id, {
        expand: ["default_price"],
    })
    const price = product.default_price as Stripe.Price | null;
    const dto = {
        id: product.id,
        name: product.name,
        description: product.description ?? null,
        images: product.images ?? [],
        price: price
            ? { unit_amount: price.unit_amount ?? null, currency: price.currency }
            : null,
    };
    return <ProductDetail product={dto} />
}