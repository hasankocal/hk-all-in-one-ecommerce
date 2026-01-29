"use client";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function KVKKPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-1">
                {/* Hero */}
                <section className="bg-gradient-to-b from-warm-beige/50 to-transparent py-12 md:py-16">
                    <div className="max-w-[1200px] mx-auto px-4 md:px-6 text-center">
                        <h1 className="text-3xl md:text-4xl font-bold text-deep-olive mb-4">
                            Kişisel Verilerin Korunması
                        </h1>
                        <p className="text-deep-olive/70 max-w-2xl mx-auto">
                            6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında aydınlatma metni
                        </p>
                    </div>
                </section>

                {/* Content */}
                <section className="py-12">
                    <div className="max-w-[900px] mx-auto px-4 md:px-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-deep-olive/5 p-6 md:p-8">
                            <div className="prose prose-lg max-w-none space-y-6 text-deep-olive/80">

                                <div>
                                    <p className="text-sm text-deep-olive/60 mb-6">
                                        Son Güncelleme: 01.01.2024
                                    </p>
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-deep-olive mb-3">
                                        1. Veri Sorumlusu
                                    </h2>
                                    <p>
                                        6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, kişisel verileriniz;
                                        veri sorumlusu olarak <strong>Olivefe Gıda San. ve Tic. Ltd. Şti.</strong> ("Şirket")
                                        tarafından aşağıda açıklanan kapsamda işlenebilecektir.
                                    </p>
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-deep-olive mb-3">
                                        2. İşlenen Kişisel Veriler
                                    </h2>
                                    <p>Şirketimiz tarafından işlenen kişisel veriler şunlardır:</p>
                                    <ul className="list-disc ml-6 space-y-1">
                                        <li><strong>Kimlik Bilgileri:</strong> Ad, soyad, T.C. kimlik numarası</li>
                                        <li><strong>İletişim Bilgileri:</strong> Telefon numarası, e-posta adresi, teslimat adresi</li>
                                        <li><strong>Müşteri İşlem Bilgileri:</strong> Sipariş geçmişi, ödeme bilgileri</li>
                                        <li><strong>Pazarlama Bilgileri:</strong> Çerez verileri, alışveriş tercihleri</li>
                                    </ul>
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-deep-olive mb-3">
                                        3. Kişisel Verilerin İşlenme Amaçları
                                    </h2>
                                    <p>Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:</p>
                                    <ul className="list-disc ml-6 space-y-1">
                                        <li>Sipariş ve teslimat süreçlerinin yürütülmesi</li>
                                        <li>Müşteri hizmetleri ve destek sağlanması</li>
                                        <li>Yasal yükümlülüklerin yerine getirilmesi</li>
                                        <li>Pazarlama ve kampanya faaliyetlerinin yürütülmesi (onay verilmesi halinde)</li>
                                        <li>Finansal ve muhasebe işlemlerinin gerçekleştirilmesi</li>
                                    </ul>
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-deep-olive mb-3">
                                        4. Kişisel Verilerin Aktarılması
                                    </h2>
                                    <p>
                                        Kişisel verileriniz, yukarıda belirtilen amaçların gerçekleştirilmesi için;
                                        kargo şirketleri, ödeme kuruluşları, yetkili kamu kurum ve kuruluşları ile paylaşılabilmektedir.
                                    </p>
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-deep-olive mb-3">
                                        5. Kişisel Veri Sahibinin Hakları
                                    </h2>
                                    <p>KVKK'nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:</p>
                                    <ul className="list-disc ml-6 space-y-1">
                                        <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                                        <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme</li>
                                        <li>Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
                                        <li>Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme</li>
                                        <li>Kişisel verilerinizin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme</li>
                                        <li>Kişisel verilerinizin silinmesini veya yok edilmesini isteme</li>
                                        <li>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme</li>
                                        <li>Kişisel verilerinizin kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme</li>
                                    </ul>
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-deep-olive mb-3">
                                        6. Başvuru Yöntemi
                                    </h2>
                                    <p>
                                        Yukarıda belirtilen haklarınızı kullanmak için aşağıdaki yöntemlerle Şirketimize başvurabilirsiniz:
                                    </p>
                                    <div className="bg-warm-beige/30 p-4 rounded-xl mt-4 space-y-2">
                                        <p className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-primary">mail</span>
                                            <span><strong>E-posta:</strong> kvkk@olivefe.com</span>
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-primary">location_on</span>
                                            <span><strong>Adres:</strong> Merkez Mahallesi, Atatürk Caddesi No:123, Aydın</span>
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-deep-olive mb-3">
                                        7. Çerezler (Cookies)
                                    </h2>
                                    <p>
                                        Web sitemizde kullanıcı deneyimini iyileştirmek amacıyla çerezler kullanılmaktadır.
                                        Çerez tercihlerinizi tarayıcı ayarlarınızdan yönetebilirsiniz.
                                    </p>
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
