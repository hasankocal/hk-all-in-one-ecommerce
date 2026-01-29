"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TrustBadges from "@/components/TrustBadges";
import ProductCard from "@/components/ProductCard";
import { ProductGridSkeleton } from "@/components/Loading";
import { getProducts, getCategories } from "@/lib/api";
import { getProductImage } from "@/lib/helpers";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cats, productsData] = await Promise.all([
          getCategories(),
          getProducts({ limit: 4 })
        ]);
        setCategories(cats || []);
        // Check if productsData has 'products' array (paginated) or is array itself
        const products = productsData.products || productsData || [];
        setBestSellers(products);
      } catch (error) {
        console.error("Failed to fetch homepage data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="max-w-[1280px] mx-auto px-4 md:px-6 py-4">
          <div className="relative h-[500px] md:h-[640px] rounded-xl md:rounded-3xl overflow-hidden group">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwBOnztMc11qbmxSMOTcmoDvY9ApHmzOVMuAloctYGiq9EqSWl3VB58OuBu6fSeTAIYSeuqQ2OoVG6neGCS5-NwIOgT_NWfz8ThS0lRjlF9NN2nUVLB1a9BSDwusQLROAbDT4gfRm-wvSXEvvsfaCArzgYcmZFjBKg4Paxzs1R9W3TrlFboFhLZsXptvzigeJitU872W5kMykcpJzCAt_VCTH7sMxGjDsIrxeGag9l-s_2pl4PjpkktjPYv5YwAn7D6sOBTRTWnzp4"
              alt="Beautiful sunny olive grove in Aydın Turkey"
              fill
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40" />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <span className="text-primary font-bold tracking-[0.2em] uppercase mb-4 text-sm animate-fade-in">Aydın'dan Gelen Gelenek</span>
              <h2 className="text-white text-4xl md:text-7xl font-black leading-tight max-w-3xl mb-8">
                Aydın’ın Bereketli Topraklarından Sofranıza
              </h2>
              <p className="text-white/90 text-lg md:text-xl max-w-xl mb-10 font-medium">
                Doğal ve geleneksel yöntemlerle, sevgiyle hazırlanan Ege lezzetlerini keşfedin.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/products" className="bg-primary hover:bg-primary/90 text-deep-olive px-10 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105">
                  Hemen Keşfet
                </Link>
                <Link href="/our-story" className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/30 px-10 py-4 rounded-lg font-bold text-lg transition-all">
                  Hikayemiz
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <TrustBadges />

        {/* Best Sellers Grid */}
        <section className="bg-warm-beige/30 py-20">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="text-gold-accent font-bold text-sm uppercase tracking-widest mb-2 block">Seçkin Ürünler</span>
                <h3 className="text-3xl font-bold tracking-tight">En Çok Satanlar</h3>
              </div>
              <div className="flex gap-2">
                <button className="size-10 rounded-full border border-deep-olive/20 flex items-center justify-center hover:bg-primary hover:border-primary transition-all">
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button className="size-10 rounded-full border border-deep-olive/20 flex items-center justify-center hover:bg-primary hover:border-primary transition-all">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>

            {loading ? (
              <ProductGridSkeleton count={4} />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {bestSellers.length > 0 ? bestSellers.map((product) => (
                  <ProductCard key={product.id} product={product} />
                )) : (
                  <div className="col-span-4 text-center py-10 text-gray-500">Henüz ürün eklenmemiş.</div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Storytelling Section */}
        <section className="max-w-[1280px] mx-auto px-6 py-24">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2 relative">
              <div className="aspect-square rounded-2xl overflow-hidden relative z-10">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBchKID-Jhg9VEBUYa8Tsl8MfBuny6fn0pzcSWiKQJ4tx6J8_CzooWXxZC4X5S2QygNrzSks1JTERt1zFnBpLtF2vUM3Tc_L9ZcOHqZonV2dxidBpfBzsJk-ZUy6GB0AHfnQvNIl9b1P81_iMXCS7P6bkBoupR9tgl7_bEistHqfOH2E_VbeoBY7jBKE4voqu7zbFEDeR8dVuk2PFHy1GiYRLZD2Bn9PZ2EpAK3Gfqx0t8YHyW0W9LMtDR84OD1O4nQRvwx9sRGZG_D"
                  alt="Traditional cold press olive oil production process"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/20 rounded-2xl -z-0"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-gold-accent/10 rounded-full -z-0"></div>
            </div>
            <div className="w-full lg:w-1/2">
              <span className="text-gold-accent font-bold text-sm uppercase tracking-widest mb-4 block">Köklerimiz Aydın</span>
              <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">Geleneksel Yöntemler, Modern Standartlar</h2>
              <p className="text-lg text-deep-olive/70 mb-8 leading-relaxed">
                Olivefe olarak hikayemiz, Aydın'ın binlerce yıllık zeytin ağaçlarının gölgesinde başladı. Toprağın bize sunduğu bu eşsiz mirası, dedelerimizden öğrendiğimiz doğal yöntemlerle işliyor, modern hijyen standartlarıyla harmanlıyoruz.
              </p>
              <p className="text-lg text-deep-olive/70 mb-10 leading-relaxed">
                Ürünlerimizin her bir damlasında Ege güneşinin sıcaklığını ve Aydın dağlarının tertemiz havasını hissedeceksiniz. Katkısız, koruyucusuz ve tamamen doğal üretim ilkemizden asla ödün vermiyoruz.
              </p>
              <div className="flex items-center gap-8">
                <div className="flex flex-col">
                  <span className="text-3xl font-black text-primary">100%</span>
                  <span className="text-xs font-bold uppercase tracking-tight text-deep-olive/50">Doğal Üretim</span>
                </div>
                <div className="h-10 w-px bg-deep-olive/10"></div>
                <div className="flex flex-col">
                  <span className="text-3xl font-black text-primary">50+</span>
                  <span className="text-xs font-bold uppercase tracking-tight text-deep-olive/50">Yıllık Tecrübe</span>
                </div>
                <div className="h-10 w-px bg-deep-olive/10"></div>
                <div className="flex flex-col">
                  <span className="text-3xl font-black text-primary">24h</span>
                  <span className="text-xs font-bold uppercase tracking-tight text-deep-olive/50">Tazelik Garantisi</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
