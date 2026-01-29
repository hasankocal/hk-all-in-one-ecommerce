"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { getOrders } from '@/lib/api';

export default function ProfilePage() {
    const router = useRouter();
    const { user, isAuthenticated, loading: authLoading, logout } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);

    useEffect(() => {
        if (!authLoading) {
            if (!isAuthenticated) {
                router.push('/login?redirect=/profile');
                return;
            }
            fetchOrders();
        }
    }, [isAuthenticated, authLoading, router]);

    const fetchOrders = async () => {
        try {
            const data = await getOrders();
            setOrders(data);
        } catch (error) {
            console.error("Failed to fetch orders", error);
        } finally {
            setLoadingOrders(false);
        }
    };

    if (authLoading) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
                </main>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 py-8 lg:px-10">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* User Info / Sidebar */}
                    <div className="w-full md:w-1/4">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                            <div className="flex flex-col items-center text-center mb-6">
                                <div className="size-20 rounded-full bg-primary/20 flex items-center justify-center text-primary text-3xl font-bold mb-4">
                                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                </div>
                                <h1 className="text-xl font-bold">{user.name}</h1>
                                <p className="text-sm text-gray-500">{user.email}</p>
                            </div>

                            <hr className="border-gray-100 my-4" />

                            <button
                                onClick={logout}
                                className="w-full flex items-center justify-center gap-2 text-red-500 bg-red-50 hover:bg-red-100 p-3 rounded-lg transition-colors font-medium"
                            >
                                <span className="material-symbols-outlined">logout</span>
                                <span>Çıkış Yap</span>
                            </button>
                        </div>
                    </div>

                    {/* Orders History */}
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold mb-6">Sipariş Geçmişim</h2>

                        {loadingOrders ? (
                            <div className="flex justify-center p-8">
                                <span className="size-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></span>
                            </div>
                        ) : orders.length === 0 ? (
                            <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 text-center">
                                <span className="material-symbols-outlined text-6xl text-gray-200 mb-4">shopping_bag</span>
                                <h3 className="text-lg font-bold mb-2">Henüz Siparişiniz Yok</h3>
                                <p className="text-gray-500 mb-6">Daha önce verdiğiniz siparişler burada listelenecektir.</p>
                                <button onClick={() => router.push('/products')} className="bg-primary text-deep-olive px-6 py-2 rounded-lg font-bold hover:scale-105 transition-all">
                                    Alışverişe Başla
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {orders.map((order) => (
                                    <div key={order.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                        <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                                            <div>
                                                <p className="text-xs text-gray-500 mb-1">Sipariş No</p>
                                                <p className="font-bold">#{order.id}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 mb-1">Tarih</p>
                                                <p className="font-medium">{new Date(order.created_at || Date.now()).toLocaleDateString('tr-TR')}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 mb-1">Durum</p>
                                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${order.status === 'completed' || order.status === 'paid' ? 'bg-green-100 text-green-700' :
                                                        order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                                            'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                    {order.status === 'paid' ? 'Ödendi' : order.status}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 mb-1">Toplam Tutar</p>
                                                <p className="font-black text-primary text-lg">{order.total_price} TL</p>
                                            </div>
                                        </div>

                                        {order.items && order.items.length > 0 && (
                                            <div className="border-t border-gray-100 pt-4 mt-4">
                                                <p className="text-xs text-gray-500 mb-2">Ürünler</p>
                                                <div className="space-y-2">
                                                    {order.items.map((item, idx) => (
                                                        <div key={idx} className="flex justify-between text-sm">
                                                            <span className="opacity-80">{item.product_name || `Ürün #${item.product_id}`} <span className="text-gray-400">x{item.quantity}</span></span>
                                                            <span className="font-medium">{item.price * item.quantity} TL</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
