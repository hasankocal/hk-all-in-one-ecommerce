"use client";
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const faqData = [
    {
        category: "Sipariş & Teslimat",
        questions: [
            {
                q: "Siparişim ne zaman kargoya verilir?",
                a: "Saat 16:00'ya kadar verilen siparişler aynı gün kargoya teslim edilir. Hafta sonu verilen siparişler Pazartesi günü kargoya verilir."
            },
            {
                q: "Kargo ücreti ne kadar?",
                a: "150₺ ve üzeri siparişlerde kargo ücretsizdir. 150₺ altı siparişlerde sabit 29,90₺ kargo ücreti uygulanır."
            },
            {
                q: "Hangi kargo firması ile gönderim yapıyorsunuz?",
                a: "Siparişlerinizi Yurtiçi Kargo ve Aras Kargo ile gönderiyoruz. Kargo takip numaranız sipariş onayından sonra SMS ve e-posta ile tarafınıza iletilir."
            },
            {
                q: "Kargom ne zaman ulaşır?",
                a: "Siparişiniz kargoya verildikten sonra 1-3 iş günü içinde adresinize teslim edilir. Uzak bölgeler için bu süre 3-5 iş gününe uzayabilir."
            },
        ]
    },
    {
        category: "Ödeme",
        questions: [
            {
                q: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
                a: "Kredi kartı (Visa, MasterCard, American Express), banka kartı, havale/EFT ve kapıda ödeme (nakit veya kart) seçeneklerini kabul ediyoruz."
            },
            {
                q: "Kapıda ödeme seçeneği var mı?",
                a: "Evet, kapıda nakit veya kredi kartı ile ödeme yapabilirsiniz. Kapıda ödeme için ek 10₺ hizmet bedeli uygulanmaktadır."
            },
            {
                q: "Taksit seçeneği var mı?",
                a: "Evet, 100₺ ve üzeri alışverişlerde 3 ve 6 taksit seçeneklerimiz mevcuttur. Taksit seçenekleri ödeme sayfasında görüntülenir."
            },
        ]
    },
    {
        category: "Ürünler",
        questions: [
            {
                q: "Ürünleriniz organik mi?",
                a: "Ürünlerimiz geleneksel yöntemlerle, katkı maddesi ve koruyucu kullanılmadan üretilmektedir. Organik sertifikalı ürünlerimiz ayrıca belirtilmektedir."
            },
            {
                q: "Ürünlerin son kullanma tarihleri ne kadar?",
                a: "Her ürünün ambalajında son kullanma tarihi belirtilmektedir. Zeytinyağı ve kurutulmuş ürünler genellikle 1-2 yıl, salçalar 6-12 ay raf ömrüne sahiptir."
            },
            {
                q: "Ürünler nasıl saklanmalı?",
                a: "Zeytinyağları serin ve karanlık ortamda, kurutulmuş ürünler kuru ortamda, salçalar ise açıldıktan sonra buzdolabında saklanmalıdır."
            },
        ]
    },
    {
        category: "İade & Değişim",
        questions: [
            {
                q: "İade yapabilir miyim?",
                a: "Evet, ürünü teslim aldıktan sonra 14 gün içinde iade edebilirsiniz. Ürünün kullanılmamış ve orijinal ambalajında olması gerekmektedir."
            },
            {
                q: "Hasarlı ürün gelirse ne yapmalıyım?",
                a: "Kargo tesliminde ürünün hasarlı olduğunu fark ederseniz, tutanak tutturarak teslim almayı reddedebilirsiniz. Teslim aldıktan sonra fark ederseniz, 24 saat içinde fotoğraflı olarak bize ulaşın."
            },
            {
                q: "İade için kargo ücreti ödemem gerekiyor mu?",
                a: "Hasarlı veya hatalı ürün iadelerinde kargo ücreti tarafımızdan karşılanır. Müşteri kaynaklı iadelerde kargo ücreti alıcıya aittir."
            },
        ]
    },
];

function AccordionItem({ question, answer, isOpen, onClick }) {
    return (
        <div className="border-b border-deep-olive/10 last:border-b-0">
            <button
                onClick={onClick}
                className="w-full flex items-center justify-between py-4 px-1 text-left hover:text-primary transition-colors"
            >
                <span className="font-semibold text-deep-olive pr-4">{question}</span>
                <span className={`material-symbols-outlined text-primary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    expand_more
                </span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-4' : 'max-h-0'}`}>
                <p className="text-deep-olive/70 leading-relaxed px-1">
                    {answer}
                </p>
            </div>
        </div>
    );
}

export default function SSSPage() {
    const [openItems, setOpenItems] = useState({});

    const toggleItem = (categoryIndex, questionIndex) => {
        const key = `${categoryIndex}-${questionIndex}`;
        setOpenItems(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-1">
                {/* Hero */}
                <section className="bg-gradient-to-b from-warm-beige/50 to-transparent py-12 md:py-16">
                    <div className="max-w-[1200px] mx-auto px-4 md:px-6 text-center">
                        <h1 className="text-3xl md:text-4xl font-bold text-deep-olive mb-4">
                            Sıkça Sorulan Sorular
                        </h1>
                        <p className="text-deep-olive/70 max-w-2xl mx-auto">
                            Merak ettiğiniz tüm soruların cevaplarını burada bulabilirsiniz.
                            Başka sorularınız için iletişim sayfamızdan bize ulaşabilirsiniz.
                        </p>
                    </div>
                </section>

                {/* FAQ Content */}
                <section className="py-12">
                    <div className="max-w-[900px] mx-auto px-4 md:px-6">
                        <div className="space-y-8">
                            {faqData.map((category, catIndex) => (
                                <div key={catIndex} className="bg-white rounded-2xl shadow-sm border border-deep-olive/5 overflow-hidden">
                                    <div className="bg-primary/10 px-6 py-4">
                                        <h2 className="text-lg font-bold text-deep-olive flex items-center gap-2">
                                            <span className="material-symbols-outlined text-primary">
                                                {catIndex === 0 ? 'local_shipping' : catIndex === 1 ? 'payments' : catIndex === 2 ? 'inventory_2' : 'replay'}
                                            </span>
                                            {category.category}
                                        </h2>
                                    </div>
                                    <div className="px-6">
                                        {category.questions.map((item, qIndex) => (
                                            <AccordionItem
                                                key={qIndex}
                                                question={item.q}
                                                answer={item.a}
                                                isOpen={openItems[`${catIndex}-${qIndex}`]}
                                                onClick={() => toggleItem(catIndex, qIndex)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Contact CTA */}
                        <div className="mt-12 text-center bg-deep-olive/5 rounded-2xl p-8">
                            <h3 className="text-xl font-bold text-deep-olive mb-2">
                                Sorunuzu bulamadınız mı?
                            </h3>
                            <p className="text-deep-olive/70 mb-4">
                                Bize WhatsApp veya e-posta ile ulaşabilirsiniz.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <a
                                    href="https://wa.me/905001234567"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                                >
                                    💬 WhatsApp
                                </a>
                                <a
                                    href="/iletisim"
                                    className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-deep-olive font-semibold px-6 py-3 rounded-xl transition-colors"
                                >
                                    <span className="material-symbols-outlined">mail</span>
                                    İletişim
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
