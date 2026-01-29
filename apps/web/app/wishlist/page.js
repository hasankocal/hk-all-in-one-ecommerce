"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { getWishlist, toggleWishlistApi } from '@/lib/api';
import Image from 'next/image';

export default function WishlistPage() {
    const router = useRouter();
    const { isAuthenticated, loading: authLoading } = useAuth();
    const [wishlist, setWishlist] = useState([]);
    const [loadingWishlist, setLoadingWishlist] = useState(true);

    useEffect(() => {
        if (!authLoading) {
            if (!isAuthenticated) {
                router.push('/login?redirect=/wishlist');
                return;
            }
            fetchWishlist();
        }
    }, [isAuthenticated, authLoading, router]);

    const fetchWishlist = async () => {
        try {
            const data = await getWishlist();
            setWishlist(data);
        } catch (error) {
            console.error("Failed to fetch wishlist", error);
        } finally {
            setLoadingWishlist(false);
        }
    };

    const handleToggleWishlist = async (productId) => {
        try {
            await toggleWishlistApi(productId);
            // Remove from local state
            setWishlist(prev => prev.filter(item => item.id !== productId));
        } catch (error) {
            console.error("Failed to remove from wishlist", error);
        }
    };

    if (authLoading) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
                </main>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 py-8 lg:px-10">
                <h1 className="text-3xl font-bold mb-8">Favorilerim</h1>

                {loadingWishlist ? (
                    <div className="flex justify-center p-8">
                        <span className="size-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></span>
                    </div>
                ) : wishlist.length === 0 ? (
                    <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 text-center">
                        <span className="material-symbols-outlined text-6xl text-gray-200 mb-4">favorite</span>
                        <h3 className="text-lg font-bold mb-2">Favori Ürününüz Yok</h3>
                        <p className="text-gray-500 mb-6">Beğendiğiniz ürünleri favorilere ekleyerek daha sonra kolayca ulaşabilirsiniz.</p>
                        <button onClick={() => router.push('/products')} className="bg-primary text-deep-olive px-6 py-2 rounded-lg font-bold hover:scale-105 transition-all">
                            Ürünleri Keşfet
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {wishlist.map((product) => (
                            <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-lg transition-all">
                                <div className="relative aspect-square">
                                    <Image
                                        src={product.images?.[0] || '/placeholder.jpg'}
                                        alt={product.name}
                                        fill
                                        className="object-cover"
                                    />
                                    <button
                                        onClick={() => handleToggleWishlist(product.id)}
                                        className="absolute top-3 right-3 size-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-all"
                                    >
                                        <span className="material-symbols-outlined text-red-500 filled">favorite</span>
                                    </button>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-lg mb-2 line-clamp-2">{product.name}</h3>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            {product.sale_price ? (
                                                <>
                                                    <span className="text-gray-400 line-through text-sm mr-2">{product.price} ₺</span>
                                                    <span className="text-primary font-black text-xl">{product.sale_price} ₺</span>
                                                </>
                                            ) : (
                                                <span className="text-primary font-black text-xl">{product.price} ₺</span>
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => router.push(`/products/${product.seo_url || product.id}`)}
                                        className="w-full mt-4 bg-primary text-deep-olive py-2 rounded-lg font-bold hover:scale-105 transition-all"
                                    >
                                        İncele
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
