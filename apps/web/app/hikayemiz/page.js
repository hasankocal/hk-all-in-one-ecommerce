"use client";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function OurStoryPage() {
    return (
        <div className="flex flex-col min-h-screen bg-[#f7f8f6] text-[#161b0d]">
            <Header />
            <main>
                {/* Parallax Hero Section */}
                <section className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center">
                    <div
                        className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
                        style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.5)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuDdCbdnwJUn59Iiac3Jm2l-4v4rvz6lqMtrCwsntt9VyIfgDE_SMNLTatWY-Q-u0vOjiCgPKqUj7phLfm_Tvm1u5gHTYGc3tpWKyzo1Wc4ySG-GQ4A5ml2IOfwqVw2AykbjCtBe8aY5UvzjPjv5zAwU1-Tt25_TIf4ZUp06iQWin0tX0YbUDWk2s2QY5a2ovEQB-6cJXExOswZ2D4peSw5c2v2D3jkKaHrkVC6vIHPuJ511EwuAdCZqpfe8SrLfjTUQEmw1z90wf9yp')" }}
                    ></div>
                    <div className="relative z-10 text-center px-4 max-w-4xl">
                        <h1 className="text-white text-5xl md:text-7xl font-black leading-tight tracking-tighter mb-6">
                            Grown by Time,<br />Harvested by Hand
                        </h1>
                        <p className="text-white/90 text-lg md:text-xl font-normal max-w-2xl mx-auto mb-8">
                            Discover the heritage of ancient olive trees from the heart of Aydın. A journey through generations of passion.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-primary text-deep-olive px-8 py-4 rounded-lg font-bold text-lg hover:scale-105 transition-transform">
                                Explore Our Collection
                            </button>
                        </div>
                    </div>
                </section>

                {/* Our Heritage Timeline Section */}
                <section className="py-24 px-4 md:px-20 bg-[#f7f8f6]">
                    <div className="max-w-[960px] mx-auto">
                        <div className="mb-16 text-center">
                            <span className="text-primary font-bold tracking-widest uppercase text-sm">Our Legacy</span>
                            <h2 className="text-4xl font-bold mt-2">A Journey Through Time</h2>
                        </div>
                        {/* Timeline Component */}
                        <div className="relative">
                            {/* Central Vertical Line */}
                            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-[#dfe7cf] hidden md:block"></div>

                            {/* Entry 1 */}
                            <div className="relative flex flex-col md:flex-row items-center mb-24 group">
                                <div className="flex-1 md:pr-20 text-right hidden md:block">
                                    <h3 className="text-2xl font-bold mb-3">Ancestral Traditions</h3>
                                    <p className="text-[#7d9a4c]">The story began in 1940, in the sun-drenched family groves of Aydın. My grandfather believed that every tree has a soul that speaks through its fruit.</p>
                                </div>
                                <div className="z-10 bg-primary rounded-full p-2 border-4 border-[#f7f8f6] scale-110">
                                    <span className="material-symbols-outlined text-[#161b0d] text-xl">calendar_today</span>
                                </div>
                                <div className="flex-1 md:pl-20 mt-6 md:mt-0">
                                    <div className="md:hidden">
                                        <h3 className="text-2xl font-bold mb-3">1940s: Ancestral Traditions</h3>
                                        <p className="text-[#7d9a4c] mb-4">The story began in the sun-drenched family groves of Aydın.</p>
                                    </div>
                                    <div className="rounded-xl overflow-hidden aspect-[16/9] shadow-xl grayscale hover:grayscale-0 transition-all duration-500">
                                        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAJ4N3J0m6N5jtv9SPwEOoV7eNTrj1-gE-0-gOsmT90GytqaHSr7ozFTgJbxAhU2keKF3GbkZv-lU0lecSGvHPCPryuNpeW1yvMGvcdp4h1BxwqDqqIMdylqPH5In7x5G6J-wYksggs1qOBe35oZjDJKn9JvWGhKEMtVYvbYk3qeeg88S8Rcn3afTOTqW6NitONOoS0FRZvC6l5WI22Hmk15L2UrhmpPx64osMWcDqjwDa9i-u3oZDb-8lGQLOGjaHzU_aL0U7ZiSYh')" }}></div>
                                    </div>
                                </div>
                            </div>

                            {/* Entry 2 */}
                            <div className="relative flex flex-col md:flex-row items-center mb-24 group">
                                <div className="flex-1 md:pr-20 order-2 md:order-1 mt-6 md:mt-0">
                                    <div className="rounded-xl overflow-hidden aspect-[16/9] shadow-xl grayscale hover:grayscale-0 transition-all duration-500">
                                        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBL7c3V1hx-MQh4irvj1eu_QbV8mEZptK1_yitqewpIfK16xDiPP6BGiDie4D4pIqkfjqHvch63mlLx48D0NXAB2_HyiA4eU1Yo1uNDJQwol7EhBw_wCPvgGtR-ChOUCMCFyfcKZHHidXv0kTd475W0y_MVAg5qmrxZrqsZ_O-Em8fbFD4Oh-gq5ITaL6YmjhvujYLgz2JKYKdhMg4nrzGRquqJXKsPIMR-WaSTTDzXV6mfCoKVGTMD_2-ONB3nqQw0kwWjz--WbaPX')" }}></div>
                                    </div>
                                    <div className="md:hidden mt-4">
                                        <h3 className="text-2xl font-bold mb-3">1980s: Family Expansion</h3>
                                        <p className="text-[#7d9a4c]">Bringing our local harvest to new horizons across the Mediterranean.</p>
                                    </div>
                                </div>
                                <div className="z-10 bg-primary rounded-full p-2 border-4 border-[#f7f8f6] scale-110 order-1 md:order-2">
                                    <span className="material-symbols-outlined text-[#161b0d] text-xl">trending_up</span>
                                </div>
                                <div className="flex-1 md:pl-20 order-3 hidden md:block">
                                    <h3 className="text-2xl font-bold mb-3">Family Expansion</h3>
                                    <p className="text-[#7d9a4c]">As our family grew, so did our commitment. In the 80s, we began sharing our heritage beyond our village, bringing the liquid gold of Aydın to the wider world.</p>
                                </div>
                            </div>

                            {/* Entry 3 */}
                            <div className="relative flex flex-col md:flex-row items-center group">
                                <div className="flex-1 md:pr-20 text-right hidden md:block">
                                    <h3 className="text-2xl font-bold mb-3">Modern Olivefe</h3>
                                    <p className="text-[#7d9a4c]">Today, we combine sustainable cold-press technology with the same hand-harvesting methods our ancestors perfected 80 years ago.</p>
                                </div>
                                <div className="z-10 bg-primary rounded-full p-2 border-4 border-[#f7f8f6] scale-110">
                                    <span className="material-symbols-outlined text-[#161b0d] text-xl">eco</span>
                                </div>
                                <div className="flex-1 md:pl-20 mt-6 md:mt-0">
                                    <div className="md:hidden">
                                        <h3 className="text-2xl font-bold mb-3">2024: Modern Olivefe</h3>
                                        <p className="text-[#7d9a4c] mb-4">Sustainable production meets modern taste and premium quality.</p>
                                    </div>
                                    <div className="rounded-xl overflow-hidden aspect-[16/9] shadow-xl grayscale hover:grayscale-0 transition-all duration-500">
                                        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCO0tcrL4YIv2icKhztxl78CBswbGTDTqcaqgZ6HB20GlFr28BoCrM7lR9JjmpF9AlvxYrMh827P3xvfZsQLzM6nBACuMVYYt7S_mND1Guzj8YGzstuwAeNYtU1dtD5CqfW9nBbqVzc-2EzlbvnLHXxubxsxnutIhTT90x6XCkFVEG1PmcKYRzicgmoGnErayz9upnk98VEzuPnFx0_tP3X1UdKzi46idvpQoJIdj5IXpE276-7Lfhv9VsSeVl4dnSpGDbUqlK5vK_V')" }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Tree to Table Process */}
                <section className="py-24 px-4 bg-[#f7f8f6]">
                    <div className="max-w-[1200px] mx-auto text-center mb-16">
                        <h2 className="text-4xl font-black mb-4">From Tree to Table</h2>
                        <p className="text-[#7d9a4c]">A transparent look at how we produce our liquid gold.</p>
                    </div>
                    <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="group">
                            <div className="aspect-square rounded-2xl overflow-hidden mb-6">
                                <div className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB4oQU64v3HdOk1P-IDtYB-CXuKXC6ipMXNDNAA2qLVRTXxnyKTSf7ID_Lu6pDd1H9cHhX69HYFxtW-1KQIuQWuJpKnmYmaLQxMxSbFJps-aMDaB8QoCHJQIznVzYr-saeGabPlEPVy0qzfE4PSNElKlOl3bV9hVOxxJHF4lLrLY5PPck6idzEpP8iS9I3G6E5NTTzJhBIkvXUEQdCz7ZWBUeXIWXFQ6meH77IQESx7aNrpUvLwE7Sahh14zZWZs2bC1OLxiEQTy6TA')" }}></div>
                            </div>
                            <span className="text-primary font-bold">01.</span>
                            <h3 className="text-xl font-bold mt-2">Hand-Harvesting</h3>
                            <p className="text-sm text-[#7d9a4c] mt-2">Selected by hand at the peak of ripeness to ensure no bruising.</p>
                        </div>
                        <div className="group">
                            <div className="aspect-square rounded-2xl overflow-hidden mb-6">
                                <div className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC_oJ29pE3J9gPuwiBR6BZTWkpbWGWGaKBJj_eYQ1EKrtFKmPTMr-83IhlS6BHo3FxhrBwdEdHLIM1JmLEx2-4HD-NQr2hjMLHzOWW7v9ln7RWSOzO6O3O4oCTamr4BpeGCaZYzKfMSYgT6jhd15ALN1jpIYGeCh_zVbbkOZobuKFs5RfoqjdIAe32Cb8mkQsc6up_4kagJLzm9aOKcI2Dc4RdowGJCkiq7mN5aTLriOxHUlUvAuu0EOIiP3d2GHBakKhV0MfT_80d0')" }}></div>
                            </div>
                            <span className="text-primary font-bold">02.</span>
                            <h3 className="text-xl font-bold mt-2">Cold Extraction</h3>
                            <p className="text-sm text-[#7d9a4c] mt-2">Pressed within 4 hours of harvest at temperatures below 27°C.</p>
                        </div>
                        <div className="group">
                            <div className="aspect-square rounded-2xl overflow-hidden mb-6">
                                <div className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAklxLAzz4sPKIcR6MJI8n5gMfrU04plKgwLpvC81cDO68H_2D8g4iy4XpZ9PxZ8n1PRTLW0KkmfQRfDEaMThAgrDASuS4fdf_lRtj6-Q9N4OyQ5r0AoxrXI8dB5OuNxkme9vpah6Nsfrb_E7lh3YKz7cbZqW0azWmCfAoNtI7ipM4fDlo4RTRW4zwkIK1XfniSLFf3T6K402rD377d2BN5cdFET1yp3SQnhF7kUN2utu93SzRnlJ0ntfglbYrHybgvP-3nJb7PGQBc')" }}></div>
                            </div>
                            <span className="text-primary font-bold">03.</span>
                            <h3 className="text-xl font-bold mt-2">Natural Filtration</h3>
                            <p className="text-sm text-[#7d9a4c] mt-2">Gravity settled to preserve the high polyphenol content naturally.</p>
                        </div>
                        <div className="group">
                            <div className="aspect-square rounded-2xl overflow-hidden mb-6">
                                <div className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCn0So6do5QTpqzCu8F3kAXdq5xyWsd_Xd_03VU6ikLtUyECUl7SnJVeunZygnlNulhk7PR_IsSBllY0qJ5LGdcyGXni6E_uJuYKqPQfND0zKTXcIA8XZWattON5H9pXeQ3hw6HNrvr3IScBtRL8xIa6djQtant2EYuAaEhmeYfMAWEFHsQNqWuJxSQsmgfuxZvetgezbczetuh6myzhbrZX7h_xBRlWL1_rFyZyteO5jyyTz3nkeuLMXN5pXsCNPWjHc3FcRCo6XH8')" }}></div>
                            </div>
                            <span className="text-primary font-bold">04.</span>
                            <h3 className="text-xl font-bold mt-2">Protective Bottling</h3>
                            <p className="text-sm text-[#7d9a4c] mt-2">Stored in dark UV-resistant glass to keep flavors fresh.</p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
