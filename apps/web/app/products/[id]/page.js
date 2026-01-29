import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getProduct } from "@/lib/api";
import ProductDetailsClient from "./ProductDetailsClient";

export async function generateMetadata({ params }) {
    const { id } = await params;
    const product = await getProduct(id);

    if (!product) {
        return {
            title: "Ürün Bulunamadı | Olivefe",
        };
    }

    const title = `${product.name} | Olivefe Aydın`;
    const description = product.description || `${product.name} - Aydın'ın bereketli topraklarından geleneksel yöntemlerle hazırlanan doğal lezzet.`;
    const image = product.image_url || product.image || "https://olivefe.com.tr/logo.png";

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [image],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image],
        },
    };
}

export default async function ProductDetailsPage({ params }) {
    const { id } = await params;
    const product = await getProduct(id);

    if (!product) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4">Ürün Bulunamadı</h2>
                        <Link href="/products" className="text-primary hover:underline">Ürünlere Dön</Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-background-light">
            <Header />
            <main className="max-w-[1440px] mx-auto px-4 lg:px-10 py-12 flex flex-col gap-16 w-full">
                <ProductDetailsClient product={product} />
            </main>
            <Footer />
        </div>
    );
}
