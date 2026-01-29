"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { getProductImage } from "@/lib/helpers";

export default function ProductCard({ product, showQuickAdd = true }) {
    const { addToCart } = useCart();
    const [isAdding, setIsAdding] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);

    // Calculate discount if sale_price exists
    const price = typeof product.price === 'number' ? product.price : parseFloat(product.price || 0);
    const salePrice = product.sale_price ? (typeof product.sale_price === 'number' ? product.sale_price : parseFloat(product.sale_price)) : null;
    const hasDiscount = salePrice && salePrice > 0 && salePrice < price;
    const discountPercent = hasDiscount
        ? Math.round((1 - salePrice / price) * 100)
        : 0;

    // Check if product is new (created in last 30 days)
    const isNew = product.isNew || (product.createdAt &&
        new Date(product.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));

    // Check stock status
    const inStock = product.stock === undefined || product.stock > 0;

    const handleAddToCart = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!inStock || isAdding) return;

        setIsAdding(true);
        try {
            addToCart(product, 1);
            // Brief feedback animation
            setTimeout(() => setIsAdding(false), 1000);
        } catch (error) {
            setIsAdding(false);
        }
    };

    const handleWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsWishlisted(!isWishlisted);
        // TODO: Implement wishlist API
    };

    return (
        <Link
            href={`/products/${product.id}`}
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-primary/20 flex flex-col"
        >
            {/* Image Container */}
            <div className="relative aspect-[4/5] overflow-hidden bg-warm-beige/20">
                {/* Product Image */}
                <Image
                    src={getProductImage(product)}
                    alt={product.name || 'Product'}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    priority={false}
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {/* Discount Badge */}
                    {hasDiscount && discountPercent > 0 && (
                        <div className="bg-red-500 text-white text-[10px] font-black px-2.5 py-1 rounded-lg uppercase shadow-lg">
                            %{discountPercent} İndirim
                        </div>
                    )}

                    {/* New Badge */}
                    {isNew && !hasDiscount && (
                        <div className="bg-primary text-deep-olive text-[10px] font-black px-2.5 py-1 rounded-lg uppercase shadow-lg">
                            Yeni
                        </div>
                    )}

                    {/* Out of Stock Badge */}
                    {!inStock && (
                        <div className="bg-gray-500 text-white text-[10px] font-black px-2.5 py-1 rounded-lg uppercase shadow-lg">
                            Tükendi
                        </div>
                    )}
                </div>

                {/* Wishlist Button */}
                <button
                    onClick={handleWishlist}
                    className={`absolute top-3 right-3 size-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${isWishlisted
                        ? 'bg-red-500 text-white'
                        : 'bg-white/90 backdrop-blur text-deep-olive hover:text-red-500 hover:bg-white'
                        }`}
                >
                    <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: isWishlisted ? "'FILL' 1" : "'FILL' 0" }}>
                        favorite
                    </span>
                </button>

                {/* Quick Add Button - appears on hover */}
                {showQuickAdd && inStock && (
                    <button
                        onClick={handleAddToCart}
                        disabled={isAdding}
                        className={`absolute bottom-3 left-3 right-3 py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 transform ${isAdding
                            ? 'bg-green-500 text-white translate-y-0 opacity-100'
                            : 'bg-deep-olive text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-primary hover:text-deep-olive'
                            }`}
                    >
                        {isAdding ? (
                            <>
                                <span className="material-symbols-outlined text-lg">check</span>
                                Eklendi!
                            </>
                        ) : (
                            <>
                                <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
                                Hızlı Ekle
                            </>
                        )}
                    </button>
                )}
            </div>

            {/* Product Info */}
            <div className="p-4 flex flex-col flex-1">
                {/* Category */}
                <p className="text-[10px] text-gold-accent font-bold uppercase tracking-wider mb-1">
                    {product.Category?.name || "Ege Lezzetleri"}
                </p>

                {/* Title */}
                <h4 className="font-bold text-base mb-2 group-hover:text-primary transition-colors line-clamp-2 flex-1">
                    {product.name}
                </h4>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                    <div className="flex">
                        {[1, 2, 3, 4, 5].map(s => (
                            <span
                                key={s}
                                className="material-symbols-outlined text-sm"
                                style={{
                                    color: s <= (product.rating || 5) ? '#C4A962' : '#E5E5E5',
                                    fontVariationSettings: "'FILL' 1"
                                }}
                            >
                                star
                            </span>
                        ))}
                    </div>
                    <span className="text-[11px] text-deep-olive/40 font-medium">
                        ({product.reviewCount || 0})
                    </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                        {hasDiscount && salePrice ? (
                            <>
                                <span className="text-xl font-black text-red-600">
                                    {salePrice.toFixed(2)} ₺
                                </span>
                                <span className="text-sm text-deep-olive/40 line-through">
                                    {price.toFixed(2)} ₺
                                </span>
                            </>
                        ) : (
                            <span className="text-xl font-black text-deep-olive">
                                {price.toFixed(2)} ₺
                            </span>
                        )}
                    </div>

                    {/* Weight/Size if available */}
                    {product.weight && (
                        <span className="text-xs text-deep-olive/50 bg-warm-beige/50 px-2 py-1 rounded">
                            {product.weight}
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
}
