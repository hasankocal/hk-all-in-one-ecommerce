"use client";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function GizlilikPolitikasiPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-1">
                {/* Hero */}
                <section className="bg-gradient-to-b from-warm-beige/50 to-transparent py-12 md:py-16">
                    <div className="max-w-[1200px] mx-auto px-4 md:px-6 text-center">
                        <h1 className="text-3xl md:text-4xl font-bold text-deep-olive mb-4">
                            Gizlilik Politikası
                        </h1>
                        <p className="text-deep-olive/70 max-w-2xl mx-auto">
                            Kişisel verilerinizin korunması bizim için önemlidir
                        </p>
                    </div>
                </section>

                {/* Content */}
                <section className="py-12">
                    <div className="max-w-[900px] mx-auto px-4 md:px-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-deep-olive/5 p-6 md:p-8">
                            <div className="prose prose-lg max-w-none space-y-6 text-deep-olive/80">

                                <p className="text-sm text-deep-olive/60">
                                    Son Güncelleme: 01.01.2024
                                </p>

                                <div>
                                    <h2 className="text-xl font-bold text-deep-olive mb-3">
                                        1. Giriş
                                    </h2>
                                    <p>
                                        Bu Gizlilik Politikası, Olivefe Gıda San. ve Tic. Ltd. Şti. ("Olivefe", "biz")
                                        tarafından işletilen olivefe.com web sitesi ("Site") kullanıcılarının gizliliğini
                                        korumak amacıyla hazırlanmıştır.
                                    </p>
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-deep-olive mb-3">
                                        2. Toplanan Bilgiler
                                    </h2>
                                    <p>Sitemizi kullandığınızda aşağıdaki bilgileri toplayabiliriz:</p>
                                    <ul className="list-disc ml-6 space-y-1">
                                        <li><strong>Kimlik Bilgileri:</strong> Ad, soyad</li>
                                        <li><strong>İletişim Bilgileri:</strong> E-posta adresi, telefon numarası, teslimat adresi</li>
                                        <li><strong>Ödeme Bilgileri:</strong> Kredi kartı bilgileri (güvenli ödeme altyapısı üzerinden)</li>
                                        <li><strong>Teknik Bilgiler:</strong> IP adresi, tarayıcı türü, cihaz bilgileri</li>
                                        <li><strong>Kullanım Verileri:</strong> Ziyaret edilen sayfalar, tıklama verileri</li>
                                    </ul>
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-deep-olive mb-3">
                                        3. Bilgilerin Kullanımı
                                    </h2>
                                    <p>Topladığımız bilgileri aşağıdaki amaçlarla kullanırız:</p>
                                    <ul className="list-disc ml-6 space-y-1">
                                        <li>Siparişlerinizi işlemek ve teslim etmek</li>
                                        <li>Müşteri desteği sağlamak</li>
                                        <li>Ürün ve hizmetlerimizi geliştirmek</li>
                                        <li>Sizinle iletişim kurmak (onayınız dahilinde pazarlama)</li>
                                        <li>Yasal yükümlülüklerimizi yerine getirmek</li>
                                    </ul>
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-deep-olive mb-3">
                                        4. Çerezler (Cookies)
                                    </h2>
                                    <p>
                                        Sitemiz, kullanıcı deneyimini iyileştirmek için çerezler kullanmaktadır.
                                        Çerezler, tarayıcınız tarafından cihazınıza kaydedilen küçük metin dosyalarıdır.
                                    </p>
                                    <p className="mt-2">Kullandığımız çerez türleri:</p>
                                    <ul className="list-disc ml-6 space-y-1">
                                        <li><strong>Zorunlu Çerezler:</strong> Sitenin çalışması için gerekli</li>
                                        <li><strong>Performans Çerezleri:</strong> Site kullanımını analiz etmek için</li>
                                        <li><strong>İşlevsellik Çerezleri:</strong> Tercihlerinizi hatırlamak için</li>
                                        <li><strong>Pazarlama Çerezleri:</strong> Kişiselleştirilmiş reklamlar için (onayınız dahilinde)</li>
                                    </ul>
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-deep-olive mb-3">
                                        5. Bilgi Paylaşımı
                                    </h2>
                                    <p>
                                        Kişisel bilgilerinizi yalnızca aşağıdaki durumlarda üçüncü taraflarla paylaşırız:
                                    </p>
                                    <ul className="list-disc ml-6 space-y-1">
                                        <li>Kargo firmaları (teslimat için)</li>
                                        <li>Ödeme işlemcileri (ödeme işlemleri için)</li>
                                        <li>Yasal zorunluluklar (mahkeme kararı vb.)</li>
                                    </ul>
                                    <p className="mt-2">
                                        Bilgilerinizi hiçbir zaman pazarlama amacıyla üçüncü taraflara satmayız.
                                    </p>
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-deep-olive mb-3">
                                        6. Güvenlik
                                    </h2>
                                    <p>
                                        Kişisel bilgilerinizi korumak için endüstri standardı güvenlik önlemleri uyguluyoruz:
                                    </p>
                                    <ul className="list-disc ml-6 space-y-1">
                                        <li>SSL şifreleme ile güvenli bağlantı</li>
                                        <li>PCI-DSS uyumlu ödeme altyapısı</li>
                                        <li>Düzenli güvenlik denetimleri</li>
                                        <li>Erişim kontrolü ve yetkilendirme</li>
                                    </ul>
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-deep-olive mb-3">
                                        7. Haklarınız
                                    </h2>
                                    <p>KVKK kapsamında aşağıdaki haklara sahipsiniz:</p>
                                    <ul className="list-disc ml-6 space-y-1">
                                        <li>Verilerinize erişim talep etme</li>
                                        <li>Verilerinizin düzeltilmesini isteme</li>
                                        <li>Verilerinizin silinmesini talep etme</li>
                                        <li>İşleme itiraz etme</li>
                                        <li>Veri taşınabilirliği talep etme</li>
                                    </ul>
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-deep-olive mb-3">
                                        8. İletişim
                                    </h2>
                                    <p>
                                        Gizlilik politikamızla ilgili sorularınız için:
                                    </p>
                                    <div className="bg-warm-beige/30 p-4 rounded-xl mt-4 space-y-2">
                                        <p className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-primary">mail</span>
                                            <span><strong>E-posta:</strong> gizlilik@olivefe.com</span>
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-primary">phone</span>
                                            <span><strong>Telefon:</strong> 0 500 123 45 67</span>
                                        </p>
                                    </div>
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
