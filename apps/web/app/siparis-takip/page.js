"use client";
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { trackOrder } from "@/lib/api";

export default function SiparisTakipPage() {
    const [orderNumber, setOrderNumber] = useState("");
    const [email, setEmail] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [orderResult, setOrderResult] = useState(null);
    const [error, setError] = useState("");

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!orderNumber.trim()) {
            setError("Lütfen sipariş numaranızı giriniz.");
            return;
        }

        setIsSearching(true);
        setError("");
        setOrderResult(null);

        try {
            const data = await trackOrder(orderNumber, email);
            setOrderResult(data);
        } catch (err) {
            setError(err.message || "Bu sipariş numarasına ait bir kayıt bulunamadı. Lütfen sipariş numaranızı kontrol ediniz.");
        } finally {
            setIsSearching(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-500';
            case 'processing': return 'bg-blue-500';
            case 'shipped': return 'bg-purple-500';
            case 'delivered': return 'bg-green-500';
            case 'cancelled': return 'bg-red-500';
            default: return 'bg-gray-500';
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-1">
                {/* Hero */}
                <section className="bg-gradient-to-b from-warm-beige/50 to-transparent py-12 md:py-16">
                    <div className="max-w-[1200px] mx-auto px-4 md:px-6 text-center">
                        <h1 className="text-3xl md:text-4xl font-bold text-deep-olive mb-4">
                            Sipariş Takip
                        </h1>
                        <p className="text-deep-olive/70 max-w-2xl mx-auto">
                            Sipariş numaranız ile siparişinizin durumunu ve kargo bilgilerini sorgulayabilirsiniz.
                        </p>
                    </div>
                </section>

                {/* Search Form */}
                <section className="py-12">
                    <div className="max-w-[600px] mx-auto px-4 md:px-6">
                        <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-lg border border-deep-olive/5 p-6 md:p-8">
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-deep-olive mb-2">
                                    Sipariş Numarası
                                </label>
                                <input
                                    type="text"
                                    value={orderNumber}
                                    onChange={(e) => setOrderNumber(e.target.value)}
                                    placeholder="Örn: OLV-12345"
                                    className="w-full px-4 py-3 rounded-xl border border-deep-olive/10 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-deep-olive mb-2">
                                    E-posta Adresi (Opsiyonel)
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="ornek@email.com"
                                    className="w-full px-4 py-3 rounded-xl border border-deep-olive/10 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                />
                            </div>

                            {error && (
                                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isSearching}
                                className="w-full bg-primary hover:bg-primary/90 text-deep-olive font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {isSearching ? (
                                    <>
                                        <span className="material-symbols-outlined animate-spin">progress_activity</span>
                                        Sorgulanıyor...
                                    </>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined">search</span>
                                        Sipariş Sorgula
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Demo hint */}
                        <p className="text-center text-sm text-deep-olive/50 mt-4">
                            💡 Demo için <strong>12345</strong> yazarak test edebilirsiniz.
                        </p>
                    </div>
                </section>

                {/* Order Result */}
                {orderResult && (
                    <section className="pb-12">
                        <div className="max-w-[900px] mx-auto px-4 md:px-6">
                            {/* Order Status Card */}
                            <div className="bg-white rounded-2xl shadow-lg border border-deep-olive/5 overflow-hidden mb-6">
                                <div className="p-6 md:p-8 border-b border-deep-olive/10">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div>
                                            <p className="text-sm text-deep-olive/60 mb-1">Sipariş No</p>
                                            <h2 className="text-2xl font-bold text-deep-olive">#{orderResult.id}</h2>
                                        </div>
                                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-white font-semibold ${getStatusColor(orderResult.status)}`}>
                                            <span className="material-symbols-outlined text-lg">local_shipping</span>
                                            {orderResult.statusText}
                                        </div>
                                    </div>
                                </div>

                                {/* Timeline */}
                                <div className="p-6 md:p-8">
                                    <h3 className="font-bold text-deep-olive mb-6">Sipariş Durumu</h3>
                                    <div className="relative">
                                        {orderResult.timeline.map((step, index) => (
                                            <div key={index} className="flex gap-4 pb-6 last:pb-0">
                                                <div className="relative flex flex-col items-center">
                                                    <div className={`size-8 rounded-full flex items-center justify-center ${step.completed ? 'bg-primary' : 'bg-gray-200'}`}>
                                                        {step.completed ? (
                                                            <span className="material-symbols-outlined text-deep-olive text-lg">check</span>
                                                        ) : (
                                                            <span className="material-symbols-outlined text-gray-400 text-lg">radio_button_unchecked</span>
                                                        )}
                                                    </div>
                                                    {index < orderResult.timeline.length - 1 && (
                                                        <div className={`w-0.5 flex-1 mt-2 ${step.completed ? 'bg-primary' : 'bg-gray-200'}`} />
                                                    )}
                                                </div>
                                                <div className="flex-1 pb-2">
                                                    <p className={`font-semibold ${step.completed ? 'text-deep-olive' : 'text-gray-400'}`}>
                                                        {step.status}
                                                    </p>
                                                    {step.date && (
                                                        <p className="text-sm text-deep-olive/60">{step.date}</p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Shipping Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="bg-white rounded-2xl shadow-sm border border-deep-olive/5 p-6">
                                    <h3 className="font-bold text-deep-olive mb-4 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary">local_shipping</span>
                                        Kargo Bilgileri
                                    </h3>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-deep-olive/60">Kargo Firması</span>
                                            <span className="font-medium text-deep-olive">{orderResult.carrier || 'Henüz Belirlenmedi'}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-deep-olive/60">Takip No</span>
                                            <span className="font-medium text-deep-olive">{orderResult.trackingNumber || '-'}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-deep-olive/60">Tahmini Teslimat</span>
                                            <span className="font-medium text-deep-olive">{orderResult.estimatedDelivery || '-'}</span>
                                        </div>
                                    </div>
                                    {orderResult.carrierLink && (
                                        <a
                                            href={orderResult.carrierLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-4 w-full bg-deep-olive hover:bg-deep-olive/90 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
                                        >
                                            Kargo Takip
                                            <span className="material-symbols-outlined text-lg">open_in_new</span>
                                        </a>
                                    )}
                                </div>

                                <div className="bg-white rounded-2xl shadow-sm border border-deep-olive/5 p-6">
                                    <h3 className="font-bold text-deep-olive mb-4 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary">receipt</span>
                                        Sipariş Özeti
                                    </h3>
                                    <div className="space-y-3">
                                        {orderResult.Products?.map((item, index) => (
                                            <div key={index} className="flex justify-between text-sm">
                                                <span className="text-deep-olive/80">
                                                    {item.name} <span className="text-deep-olive/50">x{item.OrderItem.quantity}</span>
                                                </span>
                                                <span className="font-medium text-deep-olive">{item.OrderItem.price} ₺</span>
                                            </div>
                                        ))}
                                        <div className="pt-3 border-t border-deep-olive/10 flex justify-between">
                                            <span className="font-bold text-deep-olive">Toplam</span>
                                            <span className="font-bold text-primary">{orderResult.total_amount} ₺</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Help Section */}
                            <div className="bg-deep-olive/5 rounded-2xl p-6 text-center">
                                <p className="text-deep-olive/70 mb-4">
                                    Siparişinizle ilgili sorularınız için bize ulaşın.
                                </p>
                                <div className="flex flex-wrap justify-center gap-4">
                                    <a
                                        href="https://wa.me/905001234567"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors"
                                    >
                                        💬 WhatsApp
                                    </a>
                                    <a
                                        href="/iletisim"
                                        className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-deep-olive font-semibold px-5 py-2.5 rounded-xl transition-colors"
                                    >
                                        <span className="material-symbols-outlined">mail</span>
                                        İletişim
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </main>

            <Footer />
        </div>
    );
}
