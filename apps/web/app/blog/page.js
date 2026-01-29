"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function BlogPage() {
    return (
        <div className="flex flex-col min-h-screen bg-[#f7f8f6] text-[#161b0d]">
            <Header />
            <main className="max-w-[1280px] mx-auto px-4 lg:px-10 py-12 w-full">
                {/* Blog Hero */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-black mb-4">Recipes &amp; Stories</h1>
                    <p className="text-[#7d9a4c] max-w-2xl mx-auto text-lg">
                        Explore culinary inspiration using our diverse range of olive oils and dried fruits.
                    </p>
                </div>

                {/* Categories Pills */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    <button className="px-6 py-2 bg-primary text-[#161b0d] rounded-full font-bold text-sm shadow-md">All Recipes</button>
                    <button className="px-6 py-2 bg-white text-[#161b0d] border border-[#dfe7cf] rounded-full font-bold text-sm hover:border-primary transition-colors">Breakfast</button>
                    <button className="px-6 py-2 bg-white text-[#161b0d] border border-[#dfe7cf] rounded-full font-bold text-sm hover:border-primary transition-colors">Salads</button>
                    <button className="px-6 py-2 bg-white text-[#161b0d] border border-[#dfe7cf] rounded-full font-bold text-sm hover:border-primary transition-colors">Desserts</button>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {/* Post 1 */}
                    <article className="group flex flex-col gap-4 cursor-pointer">
                        <div className="aspect-[4/3] rounded-2xl overflow-hidden relative shadow-md">
                            <Image
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1_hR4wzU4Fw_A2W6Yt9QWvjCq2E_T9O0-e9L8H8w3X3n3z4_5G6K8_9n8J8M8v7_4_2C_1x3_5V8B8N8m8_L8K8j8H_7G6_F5E4Q3_2A1"
                                alt="Authentic Aegean Breakfast with Fig Jam & Olive Oil"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded text-xs font-bold uppercase tracking-widest text-[#161b0d]">
                                Breakfast
                            </div>
                        </div>
                        <div>
                            <span className="text-xs text-[#7d9a4c] font-bold uppercase tracking-wide">Oct 24, 2024 • 5 min read</span>
                            <h3 className="text-xl font-bold mt-2 group-hover:text-primary transition-colors leading-tight">Authentic Aegean Breakfast with Fig Jam &amp; Olive Oil</h3>
                            <p className="text-[#161b0d]/70 text-sm mt-3 line-clamp-3">
                                Start your day like a local. Combining our early harvest oil with fresh tomatoes, cucumbers, and homemade fig jam...
                            </p>
                            <button className="mt-4 text-primary font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                Read Recipe <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </button>
                        </div>
                    </article>

                    {/* Post 2 */}
                    <article className="group flex flex-col gap-4 cursor-pointer">
                        <div className="aspect-[4/3] rounded-2xl overflow-hidden relative shadow-md">
                            <Image
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3_k9L8M7N6P5Q4R3S2T1U0V9W8X7Y6Z5_4H3_2I1_0J9K8L7M6N5O4P3Q2R1S0T9U8V7W6X5_3_4A2_1B0_9C8D7E6F5G4H3I2J1K0L9M8N7O6"
                                alt="The Ultimate Green Salad with Lemon-Olive Dressing"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded text-xs font-bold uppercase tracking-widest text-[#161b0d]">
                                Salads
                            </div>
                        </div>
                        <div>
                            <span className="text-xs text-[#7d9a4c] font-bold uppercase tracking-wide">Oct 18, 2024 • 8 min read</span>
                            <h3 className="text-xl font-bold mt-2 group-hover:text-primary transition-colors leading-tight">The Ultimate Green Salad with Lemon-Olive Dressing</h3>
                            <p className="text-[#161b0d]/70 text-sm mt-3 line-clamp-3">
                                A simple yet sophisticated salad that highlights the peppery notes of our Memecik variety oil.
                            </p>
                            <button className="mt-4 text-primary font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                Read Recipe <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </button>
                        </div>
                    </article>

                    {/* Post 3 */}
                    <article className="group flex flex-col gap-4 cursor-pointer">
                        <div className="aspect-[4/3] rounded-2xl overflow-hidden relative shadow-md">
                            <Image
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9_j2K3L4M5N6O7P8Q9R0S1T2U3V4W5X6Y7Z8_9A0_1B2_3C4_5D6E7F8G9H0I1J2K3L4M5N6O7P8Q9R0S1T2U3V4"
                                alt="Olive Oil Orange Cake: Moist & Aromatic"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded text-xs font-bold uppercase tracking-widest text-[#161b0d]">
                                Desserts
                            </div>
                        </div>
                        <div>
                            <span className="text-xs text-[#7d9a4c] font-bold uppercase tracking-wide">Sep 30, 2024 • 12 min read</span>
                            <h3 className="text-xl font-bold mt-2 group-hover:text-primary transition-colors leading-tight">Olive Oil Orange Cake: Moist &amp; Aromatic</h3>
                            <p className="text-[#161b0d]/70 text-sm mt-3 line-clamp-3">
                                Who says olive oil is only for savory dishes? This cake will change your mind forever.
                            </p>
                            <button className="mt-4 text-primary font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                Read Recipe <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </button>
                        </div>
                    </article>
                </div>
            </main>
            <Footer />
        </div>
    );
}

