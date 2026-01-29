"use client";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TeslimatKosullariPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-1">
                {/* Hero */}
                <section className="bg-gradient-to-b from-warm-beige/50 to-transparent py-12 md:py-16">
                    <div className="max-w-[1200px] mx-auto px-4 md:px-6 text-center">
                        <h1 className="text-3xl md:text-4xl font-bold text-deep-olive mb-4">
                            Teslimat Koşulları
                        </h1>
                        <p className="text-deep-olive/70 max-w-2xl mx-auto">
                            Siparişlerinizin size ulaşması için gereken tüm bilgiler
                        </p>
                    </div>
                </section>

                {/* Content */}
                <section className="py-12">
                    <div className="max-w-[900px] mx-auto px-4 md:px-6">
                        <div className="prose prose-lg max-w-none">

                            {/* Shipping Companies */}
                            <div className="bg-white rounded-2xl shadow-sm border border-deep-olive/5 p-6 md:p-8 mb-8">
                                <h2 className="text-xl font-bold text-deep-olive mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">local_shipping</span>
                                    Kargo Firmaları
                                </h2>
                                <p className="text-deep-olive/70 mb-4">
                                    Siparişlerinizi aşağıdaki kargo firmaları ile gönderiyoruz:
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-warm-beige/30 p-4 rounded-xl">
                                        <h3 className="font-bold text-deep-olive">Yurtiçi Kargo</h3>
                                        <p className="text-sm text-deep-olive/60">Türkiye geneli teslimat</p>
                                    </div>
                                    <div className="bg-warm-beige/30 p-4 rounded-xl">
                                        <h3 className="font-bold text-deep-olive">Aras Kargo</h3>
                                        <p className="text-sm text-deep-olive/60">Türkiye geneli teslimat</p>
                                    </div>
                                </div>
                            </div>

                            {/* Shipping Fees */}
                            <div className="bg-white rounded-2xl shadow-sm border border-deep-olive/5 p-6 md:p-8 mb-8">
                                <h2 className="text-xl font-bold text-deep-olive mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">payments</span>
                                    Kargo Ücretleri
                                </h2>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-primary/10 rounded-xl">
                                        <span className="font-medium text-deep-olive">150₺ ve üzeri siparişler</span>
                                        <span className="font-bold text-primary">ÜCRETSİZ</span>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-warm-beige/30 rounded-xl">
                                        <span className="font-medium text-deep-olive">150₺ altı siparişler</span>
                                        <span className="font-bold text-deep-olive">29,90₺</span>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-warm-beige/30 rounded-xl">
                                        <span className="font-medium text-deep-olive">Kapıda ödeme hizmet bedeli</span>
                                        <span className="font-bold text-deep-olive">+10₺</span>
                                    </div>
                                </div>
                            </div>

                            {/* Delivery Times */}
                            <div className="bg-white rounded-2xl shadow-sm border border-deep-olive/5 p-6 md:p-8 mb-8">
                                <h2 className="text-xl font-bold text-deep-olive mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">schedule</span>
                                    Teslimat Süreleri
                                </h2>
                                <ul className="space-y-3 text-deep-olive/70">
                                    <li className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-primary text-lg mt-0.5">check_circle</span>
                                        <span>Saat <strong>16:00'ya kadar</strong> verilen siparişler aynı gün kargoya verilir.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-primary text-lg mt-0.5">check_circle</span>
                                        <span>Büyükşehirler için teslimat süresi <strong>1-2 iş günü</strong>dür.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-primary text-lg mt-0.5">check_circle</span>
                                        <span>Diğer il ve ilçeler için teslimat süresi <strong>2-4 iş günü</strong>dür.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-primary text-lg mt-0.5">check_circle</span>
                                        <span>Hafta sonu verilen siparişler <strong>Pazartesi</strong> günü kargoya verilir.</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Tracking */}
                            <div className="bg-white rounded-2xl shadow-sm border border-deep-olive/5 p-6 md:p-8">
                                <h2 className="text-xl font-bold text-deep-olive mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">package_2</span>
                                    Kargo Takibi
                                </h2>
                                <p className="text-deep-olive/70 mb-4">
                                    Siparişiniz kargoya verildikten sonra, kargo takip numaranız SMS ve e-posta ile tarafınıza iletilir.
                                    Bu numara ile kargo firmasının web sitesinden siparişinizi takip edebilirsiniz.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <a
                                        href="https://www.yurticikargo.com/tr/online-servisler/gonderi-sorgula"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-deep-olive font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
                                    >
                                        Yurtiçi Kargo Takip
                                        <span className="material-symbols-outlined text-lg">open_in_new</span>
                                    </a>
                                    <a
                                        href="https://www.araskargo.com.tr/trmweb/kargotakip"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-deep-olive hover:bg-deep-olive/90 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
                                    >
                                        Aras Kargo Takip
                                        <span className="material-symbols-outlined text-lg">open_in_new</span>
                                    </a>
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
