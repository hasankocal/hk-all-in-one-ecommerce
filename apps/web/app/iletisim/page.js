"use client";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function IletisimPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background-light text-[#161b0d]">
            <Header />
            <main className="flex-1 max-w-[1280px] mx-auto px-4 lg:px-10 py-12 w-full">
                <h1 className="text-4xl lg:text-5xl font-black mb-8">İletişim</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div>
                        <div className="bg-[#f3f6ec] rounded-2xl p-8 mb-8">
                            <h2 className="text-2xl font-bold mb-6">Bize Ulaşın</h2>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <span className="material-symbols-outlined text-primary">location_on</span>
                                    <div>
                                        <h3 className="font-bold mb-1">Adres</h3>
                                        <p className="text-[#161b0d]/70">
                                            Aydın, Türkiye
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <span className="material-symbols-outlined text-primary">phone</span>
                                    <div>
                                        <h3 className="font-bold mb-1">Telefon</h3>
                                        <p className="text-[#161b0d]/70">
                                            +90 256 XXX XX XX
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <span className="material-symbols-outlined text-primary">mail</span>
                                    <div>
                                        <h3 className="font-bold mb-1">E-posta</h3>
                                        <p className="text-[#161b0d]/70">
                                            info@olivefe.com.tr
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#f3f6ec] rounded-2xl p-8">
                            <h2 className="text-2xl font-bold mb-4">Çalışma Saatleri</h2>
                            <ul className="space-y-2 text-[#161b0d]/70">
                                <li className="flex justify-between">
                                    <span>Pazartesi - Cuma</span>
                                    <span className="font-bold">09:00 - 18:00</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Cumartesi</span>
                                    <span className="font-bold">09:00 - 14:00</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Pazar</span>
                                    <span className="font-bold">Kapalı</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-[#f3f6ec] rounded-2xl p-8">
                        <h2 className="text-2xl font-bold mb-6">Mesaj Gönderin</h2>

                        <form className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold mb-2">Ad Soyad</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-lg border border-[#eff3e7] bg-white focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="Adınız Soyadınız"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold mb-2">E-posta</label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-3 rounded-lg border border-[#eff3e7] bg-white focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="ornek@email.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold mb-2">Konu</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-lg border border-[#eff3e7] bg-white focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="Mesaj konusu"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold mb-2">Mesajınız</label>
                                <textarea
                                    rows={5}
                                    className="w-full px-4 py-3 rounded-lg border border-[#eff3e7] bg-white focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                                    placeholder="Mesajınızı buraya yazın..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-primary text-[#161b0d] font-bold py-4 rounded-lg hover:opacity-90 transition-opacity"
                            >
                                Gönder
                            </button>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
