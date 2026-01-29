"use client";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function IadeKosullariPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-1">
                {/* Hero */}
                <section className="bg-gradient-to-b from-warm-beige/50 to-transparent py-12 md:py-16">
                    <div className="max-w-[1200px] mx-auto px-4 md:px-6 text-center">
                        <h1 className="text-3xl md:text-4xl font-bold text-deep-olive mb-4">
                            İade ve Değişim Koşulları
                        </h1>
                        <p className="text-deep-olive/70 max-w-2xl mx-auto">
                            Müşteri memnuniyeti bizim için önceliklidir. İade ve değişim süreçlerimiz hakkında bilgi alın.
                        </p>
                    </div>
                </section>

                {/* Content */}
                <section className="py-12">
                    <div className="max-w-[900px] mx-auto px-4 md:px-6">
                        <div className="space-y-8">

                            {/* Return Policy */}
                            <div className="bg-white rounded-2xl shadow-sm border border-deep-olive/5 p-6 md:p-8">
                                <h2 className="text-xl font-bold text-deep-olive mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">replay</span>
                                    İade Hakkı
                                </h2>
                                <div className="space-y-4 text-deep-olive/70">
                                    <p>
                                        6502 sayılı Tüketicinin Korunması Hakkında Kanun gereğince, satın aldığınız ürünü
                                        teslim tarihinden itibaren <strong>14 gün</strong> içinde herhangi bir gerekçe göstermeksizin iade edebilirsiniz.
                                    </p>
                                    <div className="bg-primary/10 p-4 rounded-xl">
                                        <p className="text-sm font-medium text-deep-olive">
                                            ⚠️ Gıda ürünlerinde, ürünün açılmamış ve orijinal ambalajında olması,
                                            son kullanma tarihinin geçmemiş olması gerekmektedir.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Return Conditions */}
                            <div className="bg-white rounded-2xl shadow-sm border border-deep-olive/5 p-6 md:p-8">
                                <h2 className="text-xl font-bold text-deep-olive mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">checklist</span>
                                    İade Şartları
                                </h2>
                                <ul className="space-y-3 text-deep-olive/70">
                                    <li className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-primary text-lg mt-0.5">check_circle</span>
                                        <span>Ürün <strong>kullanılmamış</strong> ve orijinal ambalajında olmalıdır.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-primary text-lg mt-0.5">check_circle</span>
                                        <span>Ürün etiketi ve bandrolü <strong>çıkarılmamış</strong> olmalıdır.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-primary text-lg mt-0.5">check_circle</span>
                                        <span>Fatura ve teslimat belgesi <strong>iade paketi ile birlikte</strong> gönderilmelidir.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-primary text-lg mt-0.5">check_circle</span>
                                        <span>İade talebi <strong>14 gün</strong> içinde yapılmalıdır.</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Return Process */}
                            <div className="bg-white rounded-2xl shadow-sm border border-deep-olive/5 p-6 md:p-8">
                                <h2 className="text-xl font-bold text-deep-olive mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">route</span>
                                    İade Süreci
                                </h2>
                                <ol className="space-y-4">
                                    <li className="flex items-start gap-4">
                                        <span className="flex-shrink-0 w-8 h-8 bg-primary text-deep-olive font-bold rounded-full flex items-center justify-center">1</span>
                                        <div>
                                            <h3 className="font-semibold text-deep-olive">İade Talebi Oluşturun</h3>
                                            <p className="text-sm text-deep-olive/60">
                                                WhatsApp veya e-posta ile bize ulaşarak iade talebinizi iletin.
                                            </p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <span className="flex-shrink-0 w-8 h-8 bg-primary text-deep-olive font-bold rounded-full flex items-center justify-center">2</span>
                                        <div>
                                            <h3 className="font-semibold text-deep-olive">Onay Bekleyin</h3>
                                            <p className="text-sm text-deep-olive/60">
                                                Talebiniz incelendikten sonra iade onayı ve kargo kodunuz tarafınıza iletilir.
                                            </p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <span className="flex-shrink-0 w-8 h-8 bg-primary text-deep-olive font-bold rounded-full flex items-center justify-center">3</span>
                                        <div>
                                            <h3 className="font-semibold text-deep-olive">Ürünü Kargolayın</h3>
                                            <p className="text-sm text-deep-olive/60">
                                                Ürünü orijinal ambalajında, fatura ile birlikte kargoya verin.
                                            </p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <span className="flex-shrink-0 w-8 h-8 bg-primary text-deep-olive font-bold rounded-full flex items-center justify-center">4</span>
                                        <div>
                                            <h3 className="font-semibold text-deep-olive">İade İşlemi</h3>
                                            <p className="text-sm text-deep-olive/60">
                                                Ürün bize ulaştıktan sonra 3-5 iş günü içinde iade tutarı hesabınıza aktarılır.
                                            </p>
                                        </div>
                                    </li>
                                </ol>
                            </div>

                            {/* Damaged Products */}
                            <div className="bg-white rounded-2xl shadow-sm border border-deep-olive/5 p-6 md:p-8">
                                <h2 className="text-xl font-bold text-deep-olive mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">warning</span>
                                    Hasarlı Ürün Durumunda
                                </h2>
                                <div className="space-y-4 text-deep-olive/70">
                                    <p>
                                        Kargo tesliminde ürünün hasarlı olduğunu fark ederseniz:
                                    </p>
                                    <ul className="space-y-2 ml-4">
                                        <li className="flex items-start gap-2">
                                            <span className="text-primary">•</span>
                                            <span>Kargo görevlisine <strong>tutanak tutturun</strong> ve teslim almayı reddedin.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-primary">•</span>
                                            <span>Teslim aldıktan sonra fark ederseniz, <strong>24 saat</strong> içinde fotoğraflı olarak bize ulaşın.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-primary">•</span>
                                            <span>Hasarlı ürün iadelerinde kargo ücreti <strong>tarafımızdan karşılanır</strong>.</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Contact */}
                            <div className="bg-deep-olive/5 rounded-2xl p-8 text-center">
                                <h3 className="text-xl font-bold text-deep-olive mb-2">
                                    İade Talebi Oluşturmak İçin
                                </h3>
                                <p className="text-deep-olive/70 mb-4">
                                    Aşağıdaki kanallardan bize ulaşabilirsiniz.
                                </p>
                                <div className="flex flex-wrap justify-center gap-4">
                                    <a
                                        href="https://wa.me/905001234567?text=Merhaba, iade talebi oluşturmak istiyorum."
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                                    >
                                        💬 WhatsApp
                                    </a>
                                    <a
                                        href="mailto:iade@olivefe.com"
                                        className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-deep-olive font-semibold px-6 py-3 rounded-xl transition-colors"
                                    >
                                        <span className="material-symbols-outlined">mail</span>
                                        iade@olivefe.com
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
