"use client";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ProductionProcessPage() {
    return (
        <div className="flex flex-col min-h-screen bg-[#f7f8f6] text-[#161b0d]">
            <Header />
            <main>
                {/* Hero Section */}
                <section className="relative h-[60vh] w-full overflow-hidden flex items-center justify-center">
                    <div
                        className="absolute inset-0 z-0 bg-cover bg-center"
                        style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuCO0tcrL4YIv2icKhztxl78CBswbGTDTqcaqgZ6HB20GlFr28BoCrM7lR9JjmpF9AlvxYrMh827P3xvfZsQLzM6nBACuMVYYt7S_mND1Guzj8YGzstuwAeNYtU1dtD5CqfW9nBbqVzc-2EzlbvnLHXxubxsxnutIhTT90x6XCkFVEG1PmcKYRzicgmoGnErayz9upnk98VEzuPnFx0_tP3X1UdKzi46idvpQoJIdj5IXpE276-7Lfhv9VsSeVl4dnSpGDbUqlK5vK_V')" }}
                    ></div>
                    <div className="relative z-10 text-center px-4 max-w-4xl">
                        <h1 className="text-white text-5xl md:text-7xl font-black leading-tight tracking-tighter mb-6">
                            Üretim Sürecimiz
                        </h1>
                        <p className="text-white/90 text-lg md:text-xl font-normal max-w-2xl mx-auto">
                            Ağaçtan sofranıza kadar her aşamada doğallık ve kalite
                        </p>
                    </div>
                </section>

                {/* Tree to Table Process */}
                <section className="py-24 px-4 bg-[#f7f8f6]">
                    <div className="max-w-[1200px] mx-auto text-center mb-16">
                        <span className="text-primary font-bold tracking-widest uppercase text-sm">Şeffaf Üretim</span>
                        <h2 className="text-4xl font-black mb-4 mt-2">Ağaçtan Sofraya</h2>
                        <p className="text-[#7d9a4c] max-w-2xl mx-auto">
                            Zeytinlerimizin nasıl sıvı altına dönüştüğünü adım adım keşfedin. Her aşamada kalite ve doğallık önceliğimizdir.
                        </p>
                    </div>
                    <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="group">
                            <div className="aspect-square rounded-2xl overflow-hidden mb-6 shadow-xl">
                                <div className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB4oQU64v3HdOk1P-IDtYB-CXuKXC6ipMXNDNAA2qLVRTXxnyKTSf7ID_Lu6pDd1H9cHhX69HYFxtW-1KQIuQWuJpKnmYmaLQxMxSbFJps-aMDaB8QoCHJQIznVzYr-saeGabPlEPVy0qzfE4PSNElKlOl3bV9hVOxxJHF4lLrLY5PPck6idzEpP8iS9I3G6E5NTTzJhBIkvXUEQdCz7ZWBUeXIWXFQ6meH77IQESx7aNrpUvLwE7Sahh14zZWZs2bC1OLxiEQTy6TA')" }}></div>
                            </div>
                            <span className="text-primary font-bold text-lg">01.</span>
                            <h3 className="text-xl font-bold mt-2 mb-3">Elle Hasat</h3>
                            <p className="text-sm text-[#7d9a4c] leading-relaxed">
                                Zeytinler olgunluğun zirvesinde, özenle elle toplanır. Bu yöntem meyvelerin ezilmesini önler ve en yüksek kaliteyi garanti eder.
                            </p>
                        </div>
                        <div className="group">
                            <div className="aspect-square rounded-2xl overflow-hidden mb-6 shadow-xl">
                                <div className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC_oJ29pE3J9gPuwiBR6BZTWkpbWGWGaKBJj_eYQ1EKrtFKmPTMr-83IhlS6BHo3FxhrBwdEdHLIM1JmLEx2-4HD-NQr2hjMLHzOWW7v9ln7RWSOzO6O3O4oCTamr4BpeGCaZYzKfMSYgT6jhd15ALN1jpIYGeCh_zVbbkOZobuKFs5RfoqjdIAe32Cb8mkQsc6up_4kagJLzm9aOKcI2Dc4RdowGJCkiq7mN5aTLriOxHUlUvAuu0EOIiP3d2GHBakKhV0MfT_80d0')" }}></div>
                            </div>
                            <span className="text-primary font-bold text-lg">02.</span>
                            <h3 className="text-xl font-bold mt-2 mb-3">Soğuk Sıkım</h3>
                            <p className="text-sm text-[#7d9a4c] leading-relaxed">
                                Hasat sonrası 4 saat içinde, 27°C'nin altındaki sıcaklıklarda soğuk sıkım yapılır. Bu süreç tüm besin değerlerini korur.
                            </p>
                        </div>
                        <div className="group">
                            <div className="aspect-square rounded-2xl overflow-hidden mb-6 shadow-xl">
                                <div className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAklxLAzz4sPKIcR6MJI8n5gMfrU04plKgwLpvC81cDO68H_2D8g4iy4XpZ9PxZ8n1PRTLW0KkmfQRfDEaMThAgrDASuS4fdf_lRtj6-Q9N4OyQ5r0AoxrXI8dB5OuNxkme9vpah6Nsfrb_E7lh3YKz7cbZqW0azWmCfAoNtI7ipM4fDlo4RTRW4zwkIK1XfniSLFf3T6K402rD377d2BN5cdFET1yp3SQnhF7kUN2utu93SzRnlJ0ntfglbYrHybgvP-3nJb7PGQBc')" }}></div>
                            </div>
                            <span className="text-primary font-bold text-lg">03.</span>
                            <h3 className="text-xl font-bold mt-2 mb-3">Doğal Filtreleme</h3>
                            <p className="text-sm text-[#7d9a4c] leading-relaxed">
                                Yerçekimi ile doğal olarak dinlendirilerek filtrelenir. Yüksek polifenol içeriği bu şekilde korunur.
                            </p>
                        </div>
                        <div className="group">
                            <div className="aspect-square rounded-2xl overflow-hidden mb-6 shadow-xl">
                                <div className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCn0So6do5QTpqzCu8F3kAXdq5xyWsd_Xd_03VU6ikLtUyECUl7SnJVeunZygnlNulhk7PR_IsSBllY0qJ5LGdcyGXni6E_uJuYKqPQfND0zKTXcIA8XZWattON5H9pXeQ3hw6HNrvr3IScBtRL8xIa6djQtant2EYuAaEhmeYfMAWEFHsQNqWuJxSQsmgfuxZvetgezbczetuh6myzhbrZX7h_xBRlWL1_rFyZyteO5jyyTz3nkeuLMXN5pXsCNPWjHc3FcRCo6XH8')" }}></div>
                            </div>
                            <span className="text-primary font-bold text-lg">04.</span>
                            <h3 className="text-xl font-bold mt-2 mb-3">Koruyucu Şişeleme</h3>
                            <p className="text-sm text-[#7d9a4c] leading-relaxed">
                                UV korumalı koyu cam şişelerde depolanır. Bu sayede lezzet ve tazelik uzun süre korunur.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Quality Standards */}
                <section className="py-24 px-4 bg-white">
                    <div className="max-w-[1200px] mx-auto">
                        <div className="text-center mb-16">
                            <span className="text-primary font-bold tracking-widest uppercase text-sm">Kalite Standartları</span>
                            <h2 className="text-4xl font-black mb-4 mt-2">Ödün Vermediğimiz Değerler</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-warm-beige/30 p-8 rounded-2xl border border-deep-olive/10">
                                <span className="material-symbols-outlined text-5xl text-primary mb-4 block">eco</span>
                                <h3 className="text-2xl font-bold mb-3">%100 Doğal</h3>
                                <p className="text-[#7d9a4c]">
                                    Hiçbir katkı maddesi, koruyucu veya kimyasal kullanmıyoruz. Sadece doğanın sunduğu saf lezzet.
                                </p>
                            </div>
                            <div className="bg-warm-beige/30 p-8 rounded-2xl border border-deep-olive/10">
                                <span className="material-symbols-outlined text-5xl text-primary mb-4 block">verified</span>
                                <h3 className="text-2xl font-bold mb-3">Sertifikalı Üretim</h3>
                                <p className="text-[#7d9a4c]">
                                    Tüm üretim süreçlerimiz uluslararası gıda güvenliği standartlarına uygun olarak gerçekleştirilir.
                                </p>
                            </div>
                            <div className="bg-warm-beige/30 p-8 rounded-2xl border border-deep-olive/10">
                                <span className="material-symbols-outlined text-5xl text-primary mb-4 block">schedule</span>
                                <h3 className="text-2xl font-bold mb-3">24 Saat Tazelik</h3>
                                <p className="text-[#7d9a4c]">
                                    Hasattan şişelemeye kadar geçen süre maksimum 24 saat. Böylece en taze ürünü sofranıza getiriyoruz.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 px-4 bg-gradient-to-br from-deep-olive to-deep-olive/90 text-white">
                    <div className="max-w-[800px] mx-auto text-center">
                        <h2 className="text-4xl font-black mb-6">Doğallığı Deneyimleyin</h2>
                        <p className="text-white/80 text-lg mb-8">
                            Aydın'ın bereketli topraklarından gelen, geleneksel yöntemlerle üretilmiş ürünlerimizi keşfedin.
                        </p>
                        <a
                            href="/products"
                            className="inline-block bg-primary text-deep-olive px-10 py-4 rounded-lg font-bold text-lg hover:scale-105 transition-transform"
                        >
                            Ürünlerimizi Keşfet
                        </a>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
