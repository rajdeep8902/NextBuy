import Link from "next/link"

export const Navbar = () => {
    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b">
            <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-4">
                {/* Left: brand */}
                <div className="flex-1">
                    <Link href="/" className="text-lg font-semibold tracking-tight">NextBuy</Link>
                </div>

                {/* Center: links */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="/" className="hover:text-blue-600">Home</Link>
                    <Link href="/products" className="hover:text-blue-600">Products</Link>
                    <Link href="/checkout" className="hover:text-blue-600">Checkout</Link>
                </div>

                {/* Right: reserved for future actions, keeps center truly centered */}
                <div className="flex-1 flex justify-end" />
            </div>
        </nav>
    )
}