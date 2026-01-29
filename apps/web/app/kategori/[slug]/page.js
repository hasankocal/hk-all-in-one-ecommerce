import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getProductsByCategory } from "@/lib/api";
import ProductCard from "@/components/ProductCard";

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const data = await getProductsByCategory(slug);

    if (!data.category) {
        return {
            title: "Kategori Bulunamadı | Olivefe",
        };
    }

    const title = `${data.category.name} | Olivefe Ege Lezzetleri`;
    const description = data.category.description || `${data.category.name} kategorisindeki doğal ve taze Aydın ürünlerimizi keşfedin.`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'website',
        },
    };
}

export default async function CategoryPage({ params }) {
    const { slug } = await params;
    const data = await getProductsByCategory(slug);
    const { category, products = [] } = data;

    if (!category) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4 text-deep-olive">Kategori Bulunamadı</h2>
                        <Link href="/products" className="text-primary font-bold hover:underline">Tüm Ürünlere Dön</Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-background-light">
            <Header />
            <main className="max-w-[1440px] mx-auto px-4 lg:px-10 py-12 w-full">
                {/* Category Header */}
                <div className="mb-12">
                    <nav className="text-sm text-gold-accent mb-4 font-bold uppercase tracking-wider flex items-center gap-2">
                        <Link href="/" className="hover:text-primary transition-colors">Ana Sayfa</Link>
                        <span className="text-deep-olive/20">/</span>
                        <Link href="/products" className="hover:text-primary transition-colors">Ürünler</Link>
                        <span className="text-deep-olive/20">/</span>
                        <span className="text-deep-olive">{category.name}</span>
                    </nav>
                    <h1 className="text-4xl lg:text-5xl font-black mb-4 text-deep-olive tracking-tight">{category.name}</h1>
                    {category.description && (
                        <p className="text-lg text-deep-olive/70 max-w-2xl leading-relaxed">
                            {category.description}
                        </p>
                    )}
                    <div className="mt-8 flex items-center gap-2">
                        <span className="h-px w-8 bg-primary"></span>
                        <span className="text-xs font-black text-primary uppercase tracking-[0.2em]">{products.length} Benzersiz Lezzet</span>
                    </div>
                </div>

                {/* Products Grid */}
                {products.length === 0 ? (
                    <div className="text-center py-24 bg-warm-beige/20 rounded-[2rem] border border-deep-olive/5">
                        <span className="material-symbols-outlined text-4xl text-deep-olive/20 mb-4">inventory_2</span>
                        <p className="text-lg text-deep-olive/50 font-medium">Bu kategoride henüz ürün bulunmuyor.</p>
                        <Link href="/products" className="mt-6 inline-block bg-primary text-deep-olive px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all">
                            Tüm Ürünleri Keşfet
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
