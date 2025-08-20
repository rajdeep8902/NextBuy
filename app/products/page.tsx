import { ProductList } from "@/components/product-list";
import { stripe } from "@/lib/stripe";

export default async function ProductsPage(){
    const products = await stripe.products.list({
        expand: ["data.default_price"]
      });

    return(
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-4">All Products</h1>
            <ProductList products={products.data} />
        </div>
    )
}