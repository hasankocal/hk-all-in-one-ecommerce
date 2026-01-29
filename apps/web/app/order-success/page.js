"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function OrderSuccessPage() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId');
    const router = useRouter();

    useEffect(() => {
        if (!orderId) {
            router.push('/');
        }
    }, [orderId]);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 flex items-center justify-center p-4 bg-gray-50">
                <div className="w-full max-w-lg bg-white p-10 rounded-2xl shadow-xl text-center">
                    <div className="size-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                        <span className="material-symbols-outlined text-5xl">check_circle</span>
                    </div>

                    <h1 className="text-3xl font-black mb-4">Siparişiniz Alındı!</h1>
                    <p className="text-gray-500 mb-8">
                        Teşekkür ederiz. Siparişiniz başarıyla oluşturuldu.<br />
                        Sipariş numaranız: <span className="text-deep-olive font-bold">#{orderId}</span>
                    </p>

                    <div className="space-y-3">
                        <Link href="/profile" className="block w-full bg-primary text-deep-olive font-bold py-4 rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all">
                            Siparişimi Görüntüle
                        </Link>
                        <Link href="/" className="block w-full bg-gray-100 text-deep-olive font-bold py-4 rounded-xl hover:bg-gray-200 transition-all">
                            Alışverişe Devam Et
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
