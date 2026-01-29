"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const result = await login(formData.email, formData.password);

        if (!result.success) {
            setError(result.error || 'Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
            setLoading(false);
        }
        // Success redirect is handled in AuthContext or we can do it here if we remove router.push from AuthContext
        // Currently AuthContext handles redirect to '/'
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 flex items-center justify-center p-4 bg-gray-50">
                <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-black mb-2">Tekrar Hoşgeldiniz</h1>
                        <p className="text-gray-500 text-sm">Hesabınıza giriş yapın</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg mb-4 text-center font-medium">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
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
                                value={formData.password}
                                onChange={e => setFormData({ ...formData, password: e.target.value })}
                                className="w-full bg-gray-100 border-transparent focus:border-primary focus:bg-white rounded-lg p-3 outline-none transition-all"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-primary text-deep-olive font-bold py-4 rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm">
                        <span className="opacity-60">Hesabınız yok mu? </span>
                        <Link href="/register" className="font-bold text-primary hover:underline">
                            Kayıt Ol
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
