"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "@/context/LanguageContext";

export default function Footer() {
    const { t } = useTranslation();

    const shopLinks = [
        { href: "/products", label: "Tüm Ürünler" },
        { href: "/kategori/kahvaltiliklar", label: "Kahvaltılıklar" },
        { href: "/kategori/salcalar", label: "Salçalar" },
        { href: "/kategori/baharatlar", label: "Baharatlar" },
        { href: "/kategori/kurular", label: "Kurular" },
    ];

    const corporateLinks = [
        { href: "/hikayemiz", label: "Biz Kimiz?" },
        { href: "/uretim-sureci", label: "Üretim Sürecimiz" },
        { href: "/sss", label: "Sıkça Sorulan Sorular" },
        { href: "/iletisim", label: "İletişim" },
    ];

    const policyLinks = [
        { href: "/teslimat-kosullari", label: "Teslimat Koşulları" },
        { href: "/iade-kosullari", label: "İade Koşulları" },
        { href: "/kvkk", label: "KVKK" },
        { href: "/gizlilik-politikasi", label: "Gizlilik Politikası" },
    ];

    const socialLinks = [
        { href: "https://instagram.com/olivefe", label: "Instagram", icon: "📸" },
        { href: "https://facebook.com/olivefe", label: "Facebook", icon: "📘" },
        { href: "https://tiktok.com/@olivefe", label: "TikTok", icon: "🎵" },
        { href: "https://twitter.com/olivefe", label: "X (Twitter)", icon: "🐦" },
    ];

    return (
        <footer className="bg-deep-olive text-white">
            {/* Main Footer Content */}
            <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

                    {/* Brand & Contact Info */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="inline-block mb-6">
                            <Image
                                src="/logo.png"
                                alt="Olivefe"
                                width={140}
                                height={56}
                                className="h-12 w-auto object-contain brightness-0 invert"
                            />
                        </Link>
                        <p className="text-white/60 mb-6 leading-relaxed">
                            Aydın'ın bereketli topraklarından sofranıza doğal ve geleneksel Ege lezzetleri.
                            Katkısız, koruyucusuz, tamamen doğal.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3">
                            <a
                                href="https://goo.gl/maps/your-location"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start gap-3 text-sm text-white/60 hover:text-primary transition-colors"
                            >
                                <span className="material-symbols-outlined text-primary text-lg mt-0.5">location_on</span>
                                <span>Merkez Mahallesi, Atatürk Caddesi No:123<br />Aydın, Türkiye</span>
                            </a>
                            <a
                                href="tel:+905001234567"
                                className="flex items-center gap-3 text-sm text-white/60 hover:text-primary transition-colors"
                            >
                                <span className="material-symbols-outlined text-primary text-lg">phone</span>
                                <span>0 500 123 45 67</span>
                            </a>
                            <a
                                href="https://wa.me/905001234567"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-sm text-white/60 hover:text-green-400 transition-colors"
                            >
                                <span className="text-green-400 text-lg">💬</span>
                                <span>WhatsApp ile İletişim</span>
                            </a>
                            <a
                                href="mailto:info@olivefe.com"
                                className="flex items-center gap-3 text-sm text-white/60 hover:text-primary transition-colors"
                            >
                                <span className="material-symbols-outlined text-primary text-lg">mail</span>
                                <span>info@olivefe.com</span>
                            </a>
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h4 className="font-bold text-primary mb-5 uppercase text-sm tracking-wider">Mağaza</h4>
                        <ul className="space-y-3">
                            {shopLinks.map((link) => (
                                <li key={link.href + link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-white/60 hover:text-white hover:pl-1 transition-all"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Corporate Links */}
                    <div>
                        <h4 className="font-bold text-primary mb-5 uppercase text-sm tracking-wider">Kurumsal</h4>
                        <ul className="space-y-3">
                            {corporateLinks.map((link) => (
                                <li key={link.href + link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-white/60 hover:text-white hover:pl-1 transition-all"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <h4 className="font-bold text-primary mb-5 mt-8 uppercase text-sm tracking-wider">Politikalar</h4>
                        <ul className="space-y-3">
                            {policyLinks.map((link) => (
                                <li key={link.href + link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-white/60 hover:text-white hover:pl-1 transition-all"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter & Social */}
                    <div>
                        <h4 className="font-bold text-primary mb-5 uppercase text-sm tracking-wider">Bülten</h4>
                        <p className="text-sm text-white/60 mb-4">
                            Yeni ürünler ve kampanyalardan haberdar olun.
                        </p>
                        <div className="flex flex-col gap-2">
                            <input
                                className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:ring-2 focus:ring-primary focus:border-transparent text-white text-sm placeholder:text-white/40"
                                placeholder="E-posta adresiniz"
                                type="email"
                            />
                            <button className="bg-primary text-deep-olive font-bold px-4 py-3 rounded-lg hover:bg-primary/90 transition-colors text-sm">
                                Abone Ol
                            </button>
                        </div>

                        <h4 className="font-bold text-primary mb-4 mt-8 uppercase text-sm tracking-wider">Bizi Takip Edin</h4>
                        <div className="flex flex-wrap gap-2">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-white/60 hover:text-white transition-all"
                                    title={link.label}
                                >
                                    <span>{link.icon}</span>
                                    <span className="hidden sm:inline">{link.label}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-white/40 text-sm text-center md:text-left">
                        © {new Date().getFullYear()} Olivefe. Tüm hakları saklıdır.
                    </p>

                    {/* Trust Badges */}
                    <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/40">
                            <span className="material-symbols-outlined text-sm text-primary">verified</span>
                            <span>Güvenli Alışveriş</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/40">
                            <span className="material-symbols-outlined text-sm text-primary">eco</span>
                            <span>%100 Doğal</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/40">
                            <span className="material-symbols-outlined text-sm text-primary">local_shipping</span>
                            <span>Hızlı Kargo</span>
                        </div>
                    </div>

                    {/* Payment Methods */}
                    <div className="flex items-center gap-3 text-white/40">
                        <span className="text-xs">Ödeme Yöntemleri:</span>
                        <div className="flex gap-2">
                            <div className="px-2 py-1 bg-white/10 rounded text-[10px] font-bold">VISA</div>
                            <div className="px-2 py-1 bg-white/10 rounded text-[10px] font-bold">MC</div>
                            <div className="px-2 py-1 bg-white/10 rounded text-[10px] font-bold">KAPIDA</div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
