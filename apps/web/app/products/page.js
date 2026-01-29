"use client";
import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { getProducts, getCategories } from "@/lib/api";
import { getProductImage } from "@/lib/helpers";

import { ProductGridSkeleton } from "@/components/Loading";

function ProductsContent() {
    const searchParams = useSearchParams();
    const categoryId = searchParams.get('categoryId');
    const searchQuery = searchParams.get('search');

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        priceRange: [0, 1000],
        bottleSize: [],
        acidity: 0.5
    });

    useEffect(() => {
        const initData = async () => {
            setLoading(true);
            try {
                const [cats, productsData] = await Promise.all([
                    getCategories(),
                    getProducts({ categoryId, search: searchQuery })
                ]);
                setCategories(cats || []);
                const prodList = productsData.products || productsData || [];
                setProducts(prodList);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        };
        initData();
    }, [categoryId, searchQuery]);

    const filteredProducts = products.filter(p => {
        const matchesCategory = !categoryId || String(p.categoryId) === String(categoryId);
        const matchesSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesAcidity = !p.acidity || p.acidity <= filters.acidity;
        const matchesSize = filters.bottleSize.length === 0 || filters.bottleSize.includes(p.size);

        return matchesCategory && matchesSearch && matchesAcidity && matchesSize;
    });

    const resetFilters = () => {
        setFilters({
            priceRange: [0, 1000],
            bottleSize: [],
            acidity: 0.8
        });
        if (categoryId || searchQuery) {
            router.push('/products');
        }
    };

    return (
        <div className="flex flex-col md:flex-row gap-8">
            {/* Filter Sidebar */}
            <aside className="w-full md:w-64 flex-shrink-0">
                <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-32 border border-deep-olive/5">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="font-bold text-lg text-deep-olive">Filtreler</h3>
                        <button
                            onClick={resetFilters}
                            className="text-xs font-bold text-gold-accent hover:text-primary transition-colors flex items-center gap-1"
                        >
                            <span className="material-symbols-outlined text-sm">tune</span> Sıfırla
                        </button>
                    </div>

                    {/* Categories */}
                    <div className="mb-10">
                        <h4 className="font-bold text-[10px] uppercase tracking-widest mb-4 text-deep-olive/40 text-center border-b border-deep-olive/5 pb-2">Kategoriler</h4>
                        <ul className="space-y-1">
                            <li>
                                <Link href="/products" className={`block px-4 py-2 rounded-xl text-sm transition-all ${!categoryId ? 'bg-primary text-deep-olive font-bold shadow-md shadow-primary/20' : 'text-deep-olive/60 hover:bg-warm-beige'}`}>
                                    Tüm Ürünler
                                </Link>
                            </li>
                            {categories.map(cat => (
                                <li key={cat.id}>
                                    <Link href={`/products?categoryId=${cat.id}`} className={`block px-4 py-2 rounded-xl text-sm transition-all ${categoryId == cat.id ? 'bg-primary text-deep-olive font-bold shadow-md shadow-primary/20' : 'text-deep-olive/60 hover:bg-warm-beige'}`}>
                                        {cat.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Acidity Level */}
                    <div className="mb-10">
                        <h4 className="font-bold text-[10px] uppercase tracking-widest mb-4 text-deep-olive/40 text-center border-b border-deep-olive/5 pb-2">Asit Oranı (%)</h4>
                        <div className="px-2">
                            <input
                                type="range"
                                min="0.1"
                                max="0.8"
                                step="0.1"
                                value={filters.acidity}
                                onChange={(e) => setFilters({ ...filters, acidity: parseFloat(e.target.value) })}
                                className="w-full accent-primary h-1.5 bg-warm-beige rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="flex justify-between text-[10px] mt-3 font-bold text-deep-olive/40">
                                <span>0.1%</span>
                                <span className="text-primary bg-primary/10 px-2 py-0.5 rounded-full font-black">Max {filters.acidity}%</span>
                                <span>0.8%</span>
                            </div>
                        </div>
                    </div>

                    {/* Bottle Size */}
                    <div>
                        <h4 className="font-bold text-[10px] uppercase tracking-widest mb-4 text-deep-olive/40 text-center border-b border-deep-olive/5 pb-2">Şişe Boyutu</h4>
                        <div className="grid grid-cols-2 gap-2">
                            {['250ml', '500ml', '750ml', '1L', '2L', '5L'].map((size) => (
                                <button
                                    key={size}
                                    onClick={() => {
                                        const newSizes = filters.bottleSize.includes(size)
                                            ? filters.bottleSize.filter(s => s !== size)
                                            : [...filters.bottleSize, size];
                                        setFilters({ ...filters, bottleSize: newSizes });
                                    }}
                                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${filters.bottleSize.includes(size) ? 'bg-primary border-primary text-deep-olive shadow-sm' : 'bg-transparent border-deep-olive/5 text-deep-olive/60 hover:border-primary/30'}`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
                {loading ? (
                    <ProductGridSkeleton count={6} />
                ) : (
                    <>
                        <div className="flex items-center justify-between mb-6">
                            <p className="font-medium text-deep-olive/60">
                                Toplam <span className="font-bold text-deep-olive">{filteredProducts.length}</span> ürün listeleniyor
                            </p>
                            <div className="flex items-center gap-2">
                                <label className="text-sm font-medium">Sıralama:</label>
                                <select className="bg-transparent border border-deep-olive/10 rounded-lg px-3 py-1 text-sm focus:outline-none focus:border-primary">
                                    <option>Önerilen</option>
                                    <option>En Yeni</option>
                                    <option>Fiyat: Artan</option>
                                    <option>Fiyat: Azalan</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.length > 0 ? filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            )) : (
                                <div className="col-span-3 text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                                    <span className="material-symbols-outlined text-4xl text-gray-400 mb-2">search_off</span>
                                    <p className="text-gray-500 text-lg">Bu kriterlere uygun ürün bulunamadı.</p>
                                    <button
                                        onClick={() => window.location.href = '/products'}
                                        className="mt-4 text-primary font-bold hover:underline"
                                    >
                                        Filtreleri Temizle
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {filteredProducts.length > 0 && (
                            <div className="flex justify-center mt-12 gap-2">
                                <button className="size-10 rounded-lg border border-deep-olive/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all disabled:opacity-50" disabled>
                                    <span className="material-symbols-outlined">chevron_left</span>
                                </button>
                                <button className="size-10 rounded-lg bg-primary text-deep-olive font-bold flex items-center justify-center shadow-lg shadow-primary/20">1</button>
                                <button className="size-10 rounded-lg border border-deep-olive/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all">2</button>
                                <button className="size-10 rounded-lg border border-deep-olive/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all">3</button>
                                <button className="size-10 rounded-lg border border-deep-olive/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all">
                                    <span className="material-symbols-outlined">chevron_right</span>
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default function ProductsPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-1 max-w-[1280px] mx-auto px-4 md:px-6 py-8 w-full">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-deep-olive/60 mb-8">
                    <Link href="/" className="hover:text-primary transition-colors">Anasayfa</Link>
                    <span className="material-symbols-outlined text-xs">chevron_right</span>
                    <span className="font-bold text-deep-olive">Ürünler</span>
                </div>

                <div className="mb-10">
                    <h1 className="text-4xl md:text-5xl font-black mb-4">Aydın'ın Doğal Lezzetleri</h1>
                    <p className="text-lg text-deep-olive/70 max-w-2xl">
                        Ödüllü zeytinyağlarımızdan organik kuru incirlere, geleneksel yöntemlerle hazırlanan tüm ürünlerimizi keşfedin.
                    </p>
                </div>

                <Suspense fallback={<div className="text-center py-20">Yükleniyor...</div>}>
                    <ProductsContent />
                </Suspense>
            </main>

            <Footer />
        </div>
    );
}
