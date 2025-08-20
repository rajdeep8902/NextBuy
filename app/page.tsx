import Image from "next/image";
import { stripe } from "@/lib/stripe";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Carousel } from "@/components/carousel";

export default async function Home() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 5,
  });

  const heroImage = products.data[0]?.images?.[0] ?? "/window.svg";

  return (
    <div>
      <section className="py-10">
        <div className="mx-auto max-w-7xl rounded-lg bg-neutral-100 px-6 sm:px-10 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
            <div className="max-w-xl space-y-4">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Welcome to My Ecommerce</h2>
              <p className="text-neutral-600">Discover the latest products at the best prices.</p>
              <Button asChild variant="default" className="rounded-full bg-black text-white px-6 py-3 h-auto">
                <Link href="/products">Browse All Products</Link>
              </Button>
            </div>
            <div className="w-full flex justify-center md:justify-end">
              <Image
                alt="Featured Product"
                src={heroImage}
                className="rounded"
                width={360}
                height={360}
                priority
              />
            </div>
          </div>
        </div>
      </section>
      <section className="py-8">
        <Carousel products={products.data}/>
      </section>
    </div>
  );
}
