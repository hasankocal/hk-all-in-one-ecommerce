"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function ProductDetailsClient({ product }) {
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(0);

    const handleAddToCart = () => {
        if (product) {
            addToCart(product, quantity);
            alert("Ürün sepete eklendi!");
        }
    };

    const images = product.images || [product.image_url || product.image || "https://placehold.co/600x600"];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Gallery */}
            <div className="flex flex-col gap-4">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#f3f6ec] border border-deep-olive/5">
                    <Image
                        src={images[activeImage]}
                        alt={product.name}
                        fill
                        priority
                        className="object-cover transition-all duration-500"
                    />
                    <div className="absolute top-6 left-6 flex flex-col gap-2">
                        {product.isNew && (
                            <span className="bg-primary text-deep-olive text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-lg">
                                Yeni Sezon
                            </span>
                        )}
                    </div>
                </div>
                {images.length > 1 && (
                    <div className="grid grid-cols-4 gap-4">
                        {images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveImage(idx)}
                                className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-primary ring-2 ring-primary/20' : 'border-transparent opacity-70 hover:opacity-100'}`}
                            >
                                <div className="relative w-full h-full">
                                    <Image
                                        src={img}
                                        alt={`${product.name} ${idx + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                    <Link href="/products" className="text-gold-accent text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors">
                        {product.Category?.name || "Ege Lezzetleri"}
                    </Link>
                    <span className="text-deep-olive/20">•</span>
                    <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="text-xs font-bold text-deep-olive/60 mt-0.5">({product.reviewCount || 0} Değerlendirme)</span>
                    </div>
                </div>

                <h1 className="text-4xl lg:text-5xl font-black text-deep-olive leading-tight mb-6">{product.name}</h1>

                <p className="text-deep-olive/70 text-lg mb-8 leading-relaxed">
                    {product.description || "Aydın'ın bereketli topraklarından, özenle üretilmiş doğal lezzet."}
                </p>

                <div className="flex items-center gap-6 mb-10 pb-10 border-b border-deep-olive/5">
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-gold-accent uppercase tracking-widest mb-1">Bölge</span>
                        <span className="text-lg font-bold text-deep-olive">{product.region || "Aydın"}</span>
                    </div>
                    <div className="w-px h-10 bg-deep-olive/10"></div>
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-gold-accent uppercase tracking-widest mb-1">Hasat</span>
                        <span className="text-lg font-bold text-deep-olive">{product.harvestYear || "2024"}</span>
                    </div>
                </div>

                <div className="flex items-end gap-4 mb-10">
                    <span className="text-5xl font-black text-deep-olive tracking-tighter">
                        {typeof product.price === 'number' ? product.price.toFixed(2) : parseFloat(product.price || 0).toFixed(2)} ₺
                    </span>
                    {product.oldPrice && (
                        <span className="text-xl text-deep-olive/30 line-through mb-2">
                            {typeof product.oldPrice === 'number' ? product.oldPrice.toFixed(2) : parseFloat(product.oldPrice || 0).toFixed(2)} ₺
                        </span>
                    )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                    <div className="flex items-center bg-warm-beige/50 rounded-xl p-1 w-fit border border-deep-olive/5">
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="size-10 flex items-center justify-center text-deep-olive hover:bg-white rounded-lg transition-all"
                        >
                            <span className="material-symbols-outlined text-sm">remove</span>
                        </button>
                        <input
                            type="text"
                            value={quantity}
                            readOnly
                            className="w-12 text-center bg-transparent border-none font-bold text-deep-olive focus:ring-0"
                        />
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="size-10 flex items-center justify-center text-deep-olive hover:bg-white rounded-lg transition-all"
                        >
                            <span className="material-symbols-outlined text-sm">add</span>
                        </button>
                    </div>
                    <button
                        onClick={handleAddToCart}
                        className="flex-1 bg-primary text-deep-olive h-14 rounded-xl font-bold text-lg hover:bg-primary/90 flex items-center justify-center gap-3 transition-all shadow-lg shadow-primary/20 active:scale-95"
                    >
                        <span className="material-symbols-outlined">shopping_bag</span>
                        Sepete Ekle
                    </button>
                    <button className="size-14 rounded-xl border border-deep-olive/10 flex items-center justify-center hover:bg-warm-beige transition-all text-deep-olive">
                        <span className="material-symbols-outlined">favorite_border</span>
                    </button>
                </div>

                <div className="flex items-center gap-3 text-sm font-bold text-gold-accent bg-warm-beige/30 p-4 rounded-xl border border-deep-olive/5">
                    <span className="material-symbols-outlined">local_shipping</span>
                    <span>150 TL üzeri siparişlerde kargo bizden!</span>
                </div>
            </div>
        </div>
    );
}
