"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { createOrder } from '@/lib/api';
import { getProductImage } from '@/lib/helpers';

export default function CheckoutPage() {
    const router = useRouter();
    const { cart, totalPrice, clearCart } = useCart();
    const { user, isAuthenticated, loading: authLoading } = useAuth();
    const [loading, setLoading] = useState(false);
    const [orderCompleted, setOrderCompleted] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        address: '',
        city: '',
        cardNumber: '',
        expiry: '',
        cvv: ''
    });

    useEffect(() => {
        // Auth Check
        if (!authLoading) {
            if (!isAuthenticated) {
                router.push('/login?redirect=/checkout');
                return;
            }
            // Pre-fill user data if available
            if (user) {
                setFormData(prev => ({
                    ...prev,
                    fullName: prev.fullName || user.name || '',
                    // You might want to pre-fill other fields if stored in user profile
                }));
            }
        }

        // Cart Check - skip if order was just completed
        if (cart.length === 0 && !orderCompleted) {
            router.push('/cart');
        }
    }, [cart, isAuthenticated, authLoading, router, user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleOrderSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const orderData = {
                items: cart.map(item => ({
                    productId: item.id,
                    quantity: item.quantity,
                    price: item.price
                })),
                total_amount: totalPrice,
                shipping_address: {
                    full_name: formData.fullName,
                    phone: formData.phone,
                    address: formData.address,
                    city: formData.city
                },
                payment_method: 'credit_card'
            };

            const result = await createOrder(orderData);

            // Set flag before clearing cart to prevent useEffect redirect
            setOrderCompleted(true);
            clearCart();
            // Assuming result contains order object with id
            const orderId = result.order?.id || result.id || result.order_id || 'UNKNOWN';
            router.push(`/order-success?orderId=${orderId}`);
        } catch (error) {
            console.error("Payment failed", error);
            alert("Ödeme sırasında bir hata oluştu: " + (error.error || error.message));
        } finally {
            setLoading(false);
        }
    };

    // Don't return null if order was completed - let the redirect happen
    if (cart.length === 0 && !orderCompleted) return null;

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 max-w-[1280px] mx-auto px-4 md:px-6 py-8 w-full">
                <h1 className="text-3xl font-black mb-8">Ödeme ve Teslimat</h1>

                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Left: Forms */}
                    <div className="flex-1 space-y-8">
                        {/* Address Section */}
                        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <span className="size-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm">1</span>
                                Teslimat Bilgileri
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1 md:col-span-2">
                                    <label className="text-sm font-bold opacity-70">Ad Soyad</label>
                                    <input
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full bg-gray-50 p-3 rounded-lg border-2 border-transparent focus:border-primary outline-none"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-bold opacity-70">Telefon</label>
                                    <input
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="05XX XXX XX XX"
                                        className="w-full bg-gray-50 p-3 rounded-lg border-2 border-transparent focus:border-primary outline-none"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-bold opacity-70">Şehir</label>
                                    <input
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full bg-gray-50 p-3 rounded-lg border-2 border-transparent focus:border-primary outline-none"
                                    />
                                </div>
                                <div className="space-y-1 md:col-span-2">
                                    <label className="text-sm font-bold opacity-70">Adres</label>
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        required
                                        rows={3}
                                        className="w-full bg-gray-50 p-3 rounded-lg border-2 border-transparent focus:border-primary outline-none resize-none"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Payment Section */}
                        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <span className="size-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm">2</span>
                                Ödeme Yöntemi
                            </h2>
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-bold opacity-70">Kart Numarası</label>
                                    <input
                                        name="cardNumber"
                                        value={formData.cardNumber}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="0000 0000 0000 0000"
                                        maxLength={19}
                                        className="w-full bg-gray-50 p-3 rounded-lg border-2 border-transparent focus:border-primary outline-none"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-sm font-bold opacity-70">Son Kullanma (AA/YY)</label>
                                        <input
                                            name="expiry"
                                            value={formData.expiry}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="MM/YY"
                                            maxLength={5}
                                            className="w-full bg-gray-50 p-3 rounded-lg border-2 border-transparent focus:border-primary outline-none"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-bold opacity-70">CVV</label>
                                        <input
                                            name="cvv"
                                            value={formData.cvv}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="123"
                                            maxLength={3}
                                            className="w-full bg-gray-50 p-3 rounded-lg border-2 border-transparent focus:border-primary outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right: Order Summary */}
                    <div className="w-full lg:w-96">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                            <h3 className="font-bold text-lg mb-6">Sipariş Özeti</h3>

                            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div
                                            className="size-16 rounded-lg bg-cover bg-center bg-gray-100 flex-shrink-0"
                                            style={{ backgroundImage: `url('${getProductImage(item)}')` }}
                                        ></div>
                                        <div className="flex-1">
                                            <p className="text-sm font-bold line-clamp-1">{item.name}</p>
                                            <p className="text-xs text-gray-500">{item.quantity} adet</p>
                                            <p className="text-sm font-bold text-primary">{item.price * item.quantity} TL</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-dashed border-gray-200 pt-4 space-y-2 mb-6">
                                <div className="flex justify-between text-sm">
                                    <span className="opacity-70">Ara Toplam</span>
                                    <span className="font-bold">{totalPrice.toFixed(2)} TL</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="opacity-70">Kargo</span>
                                    <span className="font-bold text-green-600">Bedava</span>
                                </div>
                                <div className="flex justify-between text-xl font-black pt-2 border-t border-gray-100 mt-2">
                                    <span>Toplam</span>
                                    <span className="text-primary">{totalPrice.toFixed(2)} TL</span>
                                </div>
                            </div>

                            <button
                                onClick={handleOrderSubmit}
                                disabled={loading}
                                className={`w-full bg-primary text-deep-olive font-bold py-4 rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {loading ? (
                                    <span className="size-5 border-2 border-deep-olive border-t-transparent rounded-full animate-spin"></span>
                                ) : (
                                    <>
                                        <span>Siparişi Tamamla</span>
                                        <span className="material-symbols-outlined">check</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
