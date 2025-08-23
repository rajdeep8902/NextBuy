"use client"
import { useCartStore } from "@/store/cart-store"
import Link from "next/link"
import { useEffect } from "react";
export default function SuccessPage(){
    const {clear} =useCartStore();
    useEffect(()=>{
        clear();
    },[clear]) 
    return(
        <div className="container mx-auto px-4 py-8 text-center">
            <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
            <p className="mb-4">Thank you for your purchase. Your order is being processed.</p>
            <Link href={"/"} className="text-blue-600 hover:underline">Return to Home</Link>
        </div>
    )
}