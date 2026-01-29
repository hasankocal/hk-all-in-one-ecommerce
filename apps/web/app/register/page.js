"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';

export default function RegisterPage() {
    const router = useRouter();
    const { register } = useAuth();
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const result = await register(formData.name, formData.email, formData.password);

        if (!result.success) {
            setError(result.error || 'Kayıt başarısız. Lütfen tekrar deneyin.');
        }
        setLoading(false);
        // Success redirect is handled in AuthContext (to /login)
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 flex items-center justify-center p-4 bg-gray-50">
                <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-black mb-2">Aramıza Katılın</h1>
                        <p className="text-gray-500 text-sm">Doğal lezzetler dünyasına adım atın</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg mb-4 text-center font-medium">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold mb-1 opacity-70">Ad Soyad</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-gray-100 border-transparent focus:border-primary focus:bg-white rounded-lg p-3 outline-none transition-all"
                                placeholder="Adınız Soyadınız"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1 opacity-70">E-posta</label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                className="w-full bg-gray-100 border-transparent focus:border-primary focus:bg-white rounded-lg p-3 outline-none transition-all"
                                placeholder="ornek@email.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1 opacity-70">Şifre</label>
                            <input
                                type="password"
                                required
                                minLength={6}
                                value={formData.password}
                                onChange={e => setFormData({ ...formData, password: e.target.value })}
                                className="w-full bg-gray-100 border-transparent focus:border-primary focus:bg-white rounded-lg p-3 outline-none transition-all"
                                placeholder="En az 6 karakter"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-primary text-deep-olive font-bold py-4 rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Kayıt Yapılıyor...' : 'Kayıt Ol'}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm">
                        <span className="opacity-60">Zaten hesabınız var mı? </span>
                        <Link href="/login" className="font-bold text-primary hover:underline">
                            Giriş Yap
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
