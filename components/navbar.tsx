"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cart-store";
import { ShoppingCartIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
import { Button } from "./ui/button";
import { useSession, signIn, signOut } from "next-auth/react";

export const Navbar = () => {
    const { data: session } = useSession();
    const count = useCartStore((s) => s.totalItems());
    const [mobile, setmobile] = useState<boolean>(false)
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setmobile(false);
            }
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b">
            <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-4">
                <div className="flex-1">
                    <Link href="/" className="text-lg font-semibold tracking-tight">NextBuy</Link>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    <Link href="/" className="hover:text-blue-600">Home</Link>
                    <Link href="/products" className="hover:text-blue-600">Products</Link>
                    <Link href="/checkout" className="hover:text-blue-600">Checkout</Link>
                </div>

                <div className="flex-1 flex justify-end items-center">
                    {session ? (
                        <>
                            <p className="mr-4 text-sm">{session.user?.name}</p>
                            <Button variant="ghost" onClick={() => signOut()}>Logout</Button>
                        </>
                    ) : (
                        <Button variant="ghost" onClick={() => signIn('google')}>Login</Button>
                    )}
                    <Link href="/checkout" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-black/5">
                        <ShoppingCartIcon className="w-5 h-5" aria-hidden="true" />
                        {count > 0 && (
                            <span className="absolute -top-1 -right-1 inline-flex items-center justify-center rounded-full bg-black text-white text-[10px] w-4 h-4">
                                {count}
                            </span>
                        )}
                        <span className="sr-only">Cart</span>
                    </Link>
                    <Button variant="ghost" className="md:hidden" onClick={() => setmobile((prev) => !prev)}>
                        {mobile ? <XMarkIcon className="w-5 h-5" /> : <Bars3Icon className="w-5 h-5" />}
                    </Button>
                </div>
            </div>
            {
                mobile && (
                    <nav className="md:hidden bg-white shadow-md">
                        <ul className="flex flex-col p-4 space-y-2">
                            <li>
                                <Link href={"/"} className="block hover:text-blue-600">Home</Link>
                            </li>
                            <li>
                                <Link href={"/products"} className="block hover:text-blue-600">Products</Link>
                            </li>
                            <li>
                                <Link href={"/checkout"} className="block hover:text-blue-600">Checkout</Link>
                            </li>
                        </ul>
                    </nav>
                )
            }
        </nav>
    )
}