"use client";
import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { getProductImage } from "@/lib/helpers";

export default function CartPage() {
    const { cart, updateQuantity, removeFromCart, totalPrice } = useCart();

    return (
        <div className="flex flex-col min-h-screen bg-[#f7f8f6] text-[#161b0d]">
            <Header />
            <main className="max-w-[1280px] mx-auto px-4 lg:px-10 py-12 w-full">
                <h1 className="text-3xl font-black mb-10">Sepetim ({cart.length} ürün)</h1>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Cart Items */}
                    <div className="flex-1 flex flex-col gap-6">
                        {cart.length > 0 ? (
                            <div className="bg-white rounded-xl border border-[#dfe7cf] overflow-hidden">
                                {cart.map((item) => (
                                    <div key={item.id} className="p-6 flex gap-6 border-b last:border-0 border-[#dfe7cf]">
                                        <div className="size-24 rounded-lg bg-[#f3f6ec] shrink-0 overflow-hidden">
                                            <img
                                                src={getProductImage(item)}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-bold text-lg">{item.name}</h3>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-[#161b0d]/40 hover:text-red-500 transition-colors"
                                                >
                                                    <span className="material-symbols-outlined">delete</span>
                                                </button>
                                            </div>
                                            <p className="text-sm text-[#7d9a4c] mb-4">{item.Category?.name || "Ürün"}</p>
                                            <div className="flex justify-between items-end">
                                                <div className="flex items-center bg-[#f3f6ec] rounded-lg p-1 h-8">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, -1)}
                                                        className="size-6 flex items-center justify-center hover:bg-white rounded transition-shadow"
                                                    >
                                                        <span className="material-symbols-outlined text-xs">remove</span>
                                                    </button>
                                                    <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, 1)}
                                                        className="size-6 flex items-center justify-center hover:bg-white rounded transition-shadow"
                                                    >
                                                        <span className="material-symbols-outlined text-xs">add</span>
                                                    </button>
                                                </div>
                                                <span className="font-bold text-lg">{(item.price * item.quantity).toFixed(2)} TL</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-[#dfe7cf]">
                                <span className="material-symbols-outlined text-4xl text-gray-300 mb-4">shopping_cart_off</span>
                                <h3 className="text-xl font-bold mb-2">Sepetiniz Boş</h3>
                                <p className="text-gray-500 mb-6">Henüz sepetinize ürün eklemediniz.</p>
                                <Link href="/products" className="bg-primary text-[#161b0d] px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity">
                                    Alışverişe Başla
                                </Link>
                            </div>
                        )}

                        <Link href="/products" className="flex items-center gap-2 text-[#7d9a4c] font-bold hover:text-primary transition-colors w-fit">
                            <span className="material-symbols-outlined">arrow_back</span>
                            Alışverişe Devam Et
                        </Link>
                    </div>

                    {/* Order Summary */}
                    {cart.length > 0 && (
                        <div className="lg:w-96 shrink-0 h-fit">
                            <div className="bg-white rounded-xl border border-[#dfe7cf] p-6 shadow-sm">
                                <h3 className="text-xl font-bold mb-6">Sipariş Özeti</h3>

                                <div className="flex flex-col gap-4 mb-6 pb-6 border-b border-[#dfe7cf]">
                                    <div className="flex justify-between">
                                        <span className="text-[#161b0d]/60">Ara Toplam</span>
                                        <span className="font-bold">{totalPrice.toFixed(2)} TL</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[#161b0d]/60">Kargo</span>
                                        <span className="font-bold text-green-600">Bedava</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-end mb-8">
                                    <span className="font-bold text-lg">Toplam</span>
                                    <span className="font-black text-3xl font-serif">{totalPrice.toFixed(2)} TL</span>
                                </div>

                                <Link href="/checkout" className="w-full bg-primary text-[#161b0d] h-14 rounded-xl font-black text-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 mb-4 flex items-center justify-center gap-2">
                                    Ödemeye Geç <span className="material-symbols-outlined">arrow_forward</span>
                                </Link>

                                <div className="flex justify-center gap-2 text-[#161b0d]/40">
                                    <span className="material-symbols-outlined">lock</span>
                                    <span className="text-xs font-medium">Güvenli Ödeme</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
