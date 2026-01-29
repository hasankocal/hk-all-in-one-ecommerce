"use client";
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ToptanSatisPage() {
    const [formData, setFormData] = useState({
        companyName: "",
        contactName: "",
        email: "",
        phone: "",
        city: "",
        businessType: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitSuccess(true);
        }, 1500);
    };

    const benefits = [
        { icon: "percent", title: "Özel Fiyatlandırma", desc: "Toptan alımlara özel indirimli fiyatlar" },
        { icon: "local_shipping", title: "Ücretsiz Kargo", desc: "Belirli miktarın üzerinde ücretsiz kargo" },
        { icon: "support_agent", title: "Özel Temsilci", desc: "Size özel müşteri temsilcisi desteği" },
        { icon: "inventory", title: "Stok Garantisi", desc: "Düzenli siparişleriniz için stok garantisi" },
        { icon: "payments", title: "Esnek Ödeme", desc: "Çeşitli ödeme seçenekleri ve vadeli ödeme" },
        { icon: "verified", title: "Kalite Garantisi", desc: "Tüm ürünlerde kalite ve tazelik garantisi" },
    ];

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-1">
                {/* Hero */}
                <section className="bg-gradient-to-b from-warm-beige/50 to-transparent py-16 md:py-24">
                    <div className="max-w-[1200px] mx-auto px-4 md:px-6 text-center">
                        <span className="inline-block bg-primary/20 text-primary px-4 py-1.5 rounded-full text-sm font-bold mb-4">
                            B2B Satış
                        </span>
                        <h1 className="text-3xl md:text-5xl font-bold text-deep-olive mb-6">
                            Toptan Satış Programı
                        </h1>
                        <p className="text-lg text-deep-olive/70 max-w-2xl mx-auto mb-8">
                            Restoran, otel, market ve kurumsal alıcılar için özel fiyatlandırma ve avantajlarla
                            Aydın'ın doğal lezzetlerini işletmenize taşıyın.
                        </p>
                        <a href="#basvuru-formu" className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-deep-olive font-bold px-8 py-4 rounded-xl transition-colors">
                            <span className="material-symbols-outlined">send</span>
                            Başvuru Yap
                        </a>
                    </div>
                </section>

                {/* Benefits */}
                <section className="py-16">
                    <div className="max-w-[1200px] mx-auto px-4 md:px-6">
                        <h2 className="text-2xl md:text-3xl font-bold text-deep-olive text-center mb-12">
                            Toptan Satış Avantajları
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-deep-olive/5 hover:shadow-lg transition-all">
                                    <div className="size-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                                        <span className="material-symbols-outlined text-2xl text-primary">{benefit.icon}</span>
                                    </div>
                                    <h3 className="font-bold text-lg text-deep-olive mb-2">{benefit.title}</h3>
                                    <p className="text-deep-olive/60">{benefit.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Who Can Apply */}
                <section className="py-16 bg-warm-beige/30">
                    <div className="max-w-[1200px] mx-auto px-4 md:px-6">
                        <h2 className="text-2xl md:text-3xl font-bold text-deep-olive text-center mb-12">
                            Kimler Başvurabilir?
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {["Restoranlar & Kafeler", "Oteller", "Marketler", "Kurumsal Firmalar", "Catering Şirketleri", "Hediyelik Eşya Dükkanları", "E-Ticaret Siteleri", "Diğer İşletmeler"].map((type, index) => (
                                <div key={index} className="bg-white rounded-xl p-4 text-center border border-deep-olive/5">
                                    <span className="material-symbols-outlined text-3xl text-primary mb-2 block">check_circle</span>
                                    <p className="font-medium text-deep-olive text-sm">{type}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Application Form */}
                <section id="basvuru-formu" className="py-16">
                    <div className="max-w-[700px] mx-auto px-4 md:px-6">
                        <h2 className="text-2xl md:text-3xl font-bold text-deep-olive text-center mb-4">
                            Toptan Satış Başvurusu
                        </h2>
                        <p className="text-center text-deep-olive/60 mb-8">
                            Formu doldurun, size en kısa sürede dönüş yapalım.
                        </p>

                        {submitSuccess ? (
                            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                                <span className="material-symbols-outlined text-5xl text-green-500 mb-4">check_circle</span>
                                <h3 className="text-xl font-bold text-green-700 mb-2">Başvurunuz Alındı!</h3>
                                <p className="text-green-600">
                                    En kısa sürede sizinle iletişime geçeceğiz.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-deep-olive/5 p-6 md:p-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-deep-olive mb-2">
                                            Firma Adı *
                                        </label>
                                        <input
                                            type="text"
                                            name="companyName"
                                            value={formData.companyName}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-deep-olive/10 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-deep-olive mb-2">
                                            Yetkili Adı Soyadı *
                                        </label>
                                        <input
                                            type="text"
                                            name="contactName"
                                            value={formData.contactName}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-deep-olive/10 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-deep-olive mb-2">
                                            E-posta *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-deep-olive/10 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-deep-olive mb-2">
                                            Telefon *
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-deep-olive/10 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-deep-olive mb-2">
                                            Şehir *
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-deep-olive/10 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-deep-olive mb-2">
                                            İşletme Türü *
                                        </label>
                                        <select
                                            name="businessType"
                                            value={formData.businessType}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-deep-olive/10 focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white"
                                        >
                                            <option value="">Seçiniz</option>
                                            <option value="restoran">Restoran / Kafe</option>
                                            <option value="otel">Otel</option>
                                            <option value="market">Market / Bakkal</option>
                                            <option value="kurumsal">Kurumsal Firma</option>
                                            <option value="catering">Catering</option>
                                            <option value="eticaret">E-Ticaret</option>
                                            <option value="diger">Diğer</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-semibold text-deep-olive mb-2">
                                        Mesajınız
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={4}
                                        placeholder="Hangi ürünlerle ilgileniyorsunuz? Tahmini aylık sipariş miktarınız nedir?"
                                        className="w-full px-4 py-3 rounded-xl border border-deep-olive/10 focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-primary hover:bg-primary/90 text-deep-olive font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="material-symbols-outlined animate-spin">progress_activity</span>
                                            Gönderiliyor...
                                        </>
                                    ) : (
                                        <>
                                            <span className="material-symbols-outlined">send</span>
                                            Başvuru Gönder
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </section>

                {/* Contact Alternative */}
                <section className="py-12 bg-deep-olive text-white">
                    <div className="max-w-[1200px] mx-auto px-4 md:px-6 text-center">
                        <h3 className="text-xl font-bold mb-4">Hemen Bilgi Almak İster misiniz?</h3>
                        <p className="text-white/70 mb-6">Toptan satış ekibimizle doğrudan iletişime geçebilirsiniz.</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a
                                href="https://wa.me/905001234567?text=Merhaba, toptan satış hakkında bilgi almak istiyorum."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                            >
                                💬 WhatsApp
                            </a>
                            <a
                                href="tel:+905001234567"
                                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                            >
                                <span className="material-symbols-outlined">phone</span>
                                0 500 123 45 67
                            </a>
                            <a
                                href="mailto:toptan@olivefe.com"
                                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-deep-olive font-semibold px-6 py-3 rounded-xl transition-colors"
                            >
                                <span className="material-symbols-outlined">mail</span>
                                toptan@olivefe.com
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
