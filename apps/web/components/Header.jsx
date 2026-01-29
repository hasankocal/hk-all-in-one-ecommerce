"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "@/context/LanguageContext";
import { getCategories, getProducts } from "@/lib/api";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Header() {
    const router = useRouter();
    const { totalItems } = useCart();
    const { user, logout } = useAuth();
    const { t } = useTranslation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchOpen, setSearchOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [megaMenuOpen, setMegaMenuOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const storiesRef = useRef(null);
    const megaMenuRef = useRef(null);
    const searchRef = useRef(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const cats = await getCategories();
                setCategories(cats || []);
            } catch (err) {
                console.error("Failed to fetch categories:", err);
            }
        };
        fetchCategories();
    }, []);

    // Close mega menu and search results on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (megaMenuRef.current && !megaMenuRef.current.contains(event.target)) {
                setMegaMenuOpen(false);
            }
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearchResults([]);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Live Search Logic
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (searchQuery.trim().length >= 2) {
                setIsSearching(true);
                try {
                    const { products } = await getProducts({ search: searchQuery, limit: 5 });
                    setSearchResults(products || []);
                } catch (error) {
                    console.error("Search failed:", error);
                } finally {
                    setIsSearching(false);
                }
            } else {
                setSearchResults([]);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const handleLogout = () => {
        logout();
    };

    const handleSearch = (e) => {
        if (e.key === "Enter" && searchQuery.trim()) {
            router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery("");
            setSearchOpen(false);
        }
    };

    const scrollStories = (direction) => {
        if (storiesRef.current) {
            const scrollAmount = direction === 'left' ? -200 : 200;
            storiesRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const navLinks = [
        { href: "/products", label: "Ürünler", icon: "storefront", hasMegaMenu: true },
        { href: "/hikayemiz", label: "Hikayemiz" },
        { href: "/iletisim", label: "İletişim" },
    ];

    return (
        <>
            {/* Top Promo Bar */}
            <div className="bg-gradient-to-r from-deep-olive via-deep-olive to-primary/80 text-white text-center py-2 px-4">
                <div className="max-w-[1400px] mx-auto flex items-center justify-between">
                    <div className="hidden md:flex items-center gap-4 text-xs">
                        <Link href="/toptan-satis" className="flex items-center gap-1 hover:text-primary transition-colors">
                            <span className="material-symbols-outlined text-sm">storefront</span>
                            Toptan Satış
                        </Link>
                        <Link href="/siparis-takip" className="flex items-center gap-1 hover:text-primary transition-colors">
                            <span className="material-symbols-outlined text-sm">package_2</span>
                            Kargo Takip
                        </Link>
                    </div>
                    <p className="text-xs md:text-sm font-medium flex items-center justify-center gap-2 flex-1">
                        <span className="material-symbols-outlined text-sm">local_shipping</span>
                        <span>{t("promo.freeShipping")} <strong className="text-primary">{t("promo.freeShippingHighlight")}</strong></span>
                        <span className="hidden md:inline mx-2">|</span>
                        <span className="hidden md:flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">verified</span>
                            {t("promo.naturalProducts")}
                        </span>
                    </p>
                    <div className="hidden md:flex items-center gap-4 text-xs">
                        <a href="tel:+905001234567" className="flex items-center gap-1 hover:text-primary transition-colors">
                            <span className="material-symbols-outlined text-sm">phone</span>
                            0 500 123 45 67
                        </a>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <header className="sticky top-0 z-50 w-full bg-background-light shadow-sm">
                {/* Primary Header */}
                <div className="border-b border-deep-olive/10">
                    <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-3 flex items-center justify-between gap-4">
                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(true)}
                            className="lg:hidden p-2 hover:bg-warm-beige rounded-xl transition-colors text-deep-olive"
                        >
                            <span className="material-symbols-outlined">menu</span>
                        </button>

                        {/* Logo */}
                        <Link href="/" className="flex items-center shrink-0">
                            <Image
                                src="/logo.png"
                                alt="Olivefe - Since 2001 Aydın"
                                width={140}
                                height={56}
                                className="h-12 w-auto object-contain"
                                priority
                            />
                        </Link>

                        {/* Desktop Search Bar */}
                        <div className="hidden md:flex flex-1 max-w-lg mx-8 relative" ref={searchRef}>
                            <div className="relative w-full group">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-deep-olive/40 group-focus-within:text-primary transition-colors">search</span>
                                <input
                                    className="w-full pl-12 pr-4 py-3 bg-warm-beige/50 border border-deep-olive/10 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent text-sm placeholder:text-deep-olive/50 transition-all"
                                    placeholder={t("common.searchPlaceholder")}
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={handleSearch}
                                />
                                {isSearching && (
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                        <div className="size-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                )}
                            </div>

                            {/* Search Results Dropdown */}
                            {searchResults.length > 0 && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-deep-olive/10 overflow-hidden z-[60] animate-in fade-in slide-in-from-top-2 duration-200">
                                    <div className="p-2">
                                        <div className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-deep-olive/40 border-b border-deep-olive/5 mb-1">
                                            Ürün Sonuçları
                                        </div>
                                        {searchResults.map((product) => (
                                            <Link
                                                key={product.id}
                                                href={`/products/${product.id}`}
                                                onClick={() => setSearchResults([])}
                                                className="flex items-center gap-3 p-3 hover:bg-warm-beige/40 rounded-xl transition-all group"
                                            >
                                                <div className="relative size-12 rounded-lg overflow-hidden border border-deep-olive/5 flex-shrink-0">
                                                    <Image
                                                        src={product.image_url || product.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(product.name)}&background=f3f6ec&color=2D3A18`}
                                                        alt={product.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-sm font-bold text-deep-olive truncate group-hover:text-primary transition-colors">
                                                        {product.name}
                                                    </h4>
                                                    <p className="text-xs text-primary font-black">
                                                        {product.price} TL
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                    <Link
                                        href={`/products?search=${encodeURIComponent(searchQuery)}`}
                                        onClick={() => setSearchResults([])}
                                        className="block p-3 text-center text-xs font-bold text-deep-olive/60 bg-warm-beige/20 hover:bg-warm-beige/40 transition-all border-t border-deep-olive/5"
                                    >
                                        Tüm Sonuçları Gör
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Desktop Navigation with Mega Menu */}
                        <nav className="hidden lg:flex items-center gap-1" ref={megaMenuRef}>
                            {navLinks.map((link) => (
                                link.hasMegaMenu ? (
                                    <div key={link.href} className="relative">
                                        <button
                                            onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                                            onMouseEnter={() => setMegaMenuOpen(true)}
                                            className={`flex items-center gap-1 px-4 py-2 text-sm font-semibold text-deep-olive hover:text-primary hover:bg-warm-beige/50 rounded-xl transition-all ${megaMenuOpen ? 'text-primary bg-warm-beige/50' : ''}`}
                                        >
                                            <span className="material-symbols-outlined text-lg">{link.icon}</span>
                                            {link.label}
                                            <span className={`material-symbols-outlined text-sm transition-transform ${megaMenuOpen ? 'rotate-180' : ''}`}>expand_more</span>
                                        </button>

                                        {/* Mega Menu Dropdown */}
                                        {megaMenuOpen && (
                                            <div
                                                className="absolute top-full left-0 mt-2 w-[700px] bg-white rounded-2xl shadow-2xl border border-deep-olive/10 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-300"
                                                onMouseLeave={() => setMegaMenuOpen(false)}
                                            >
                                                <div className="p-8">
                                                    <div className="flex items-center justify-between mb-6">
                                                        <h3 className="font-bold text-xl text-deep-olive">Kategorilerimiz</h3>
                                                        <Link
                                                            href="/products"
                                                            className="text-sm text-primary font-bold hover:underline flex items-center gap-1 bg-primary/10 px-3 py-1.5 rounded-lg"
                                                            onClick={() => setMegaMenuOpen(false)}
                                                        >
                                                            Tümünü Gör
                                                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                                        </Link>
                                                    </div>
                                                    <div className="grid grid-cols-3 gap-6">
                                                        {categories.slice(0, 9).map((cat) => (
                                                            <Link
                                                                key={cat.id}
                                                                href={cat.seo_url ? `/kategori/${cat.seo_url}` : `/products?categoryId=${cat.id}`}
                                                                onClick={() => setMegaMenuOpen(false)}
                                                                className="flex items-center gap-4 p-3 rounded-2xl hover:bg-warm-beige/30 transition-all group border border-transparent hover:border-deep-olive/5"
                                                            >
                                                                <div className="relative size-16 rounded-xl border border-deep-olive/10 shadow-sm group-hover:scale-105 transition-transform overflow-hidden bg-warm-beige/20">
                                                                    <Image
                                                                        src={cat.image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(cat.name)}&background=C4A962&color=2D3A18&size=128`}
                                                                        alt={cat.name}
                                                                        fill
                                                                        className="object-cover"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <span className="font-bold text-sm text-deep-olive group-hover:text-primary transition-colors block mb-0.5">
                                                                        {cat.name}
                                                                    </span>
                                                                    <p className="text-xs text-deep-olive/40 font-medium">
                                                                        {cat.productCount || 0} Ürün
                                                                    </p>
                                                                </div>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                                {/* Footer of mega menu */}
                                                <div className="bg-warm-beige/20 px-8 py-5 flex items-center justify-between border-t border-deep-olive/5">
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-2xl">🚚</span>
                                                        <p className="text-sm text-deep-olive/70">
                                                            <strong>150₺</strong> üzeri siparişlerde <strong className="text-primary">ücretsiz kargo!</strong>
                                                        </p>
                                                    </div>
                                                    <Link
                                                        href="/yeni-urunler"
                                                        className="text-sm bg-primary text-deep-olive font-bold px-6 py-2.5 rounded-xl hover:bg-primary/90 transition-all shadow-md hover:shadow-lg active:scale-95"
                                                        onClick={() => setMegaMenuOpen(false)}
                                                    >
                                                        Yeni Gelenler
                                                    </Link>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <Link
                                        key={link.href}
                                        className="px-4 py-2 text-sm font-semibold text-deep-olive hover:text-primary hover:bg-warm-beige/50 rounded-xl transition-all"
                                        href={link.href}
                                    >
                                        {link.label}
                                    </Link>
                                )
                            ))}
                        </nav>

                        {/* Actions */}
                        <div className="flex items-center gap-1 md:gap-2">
                            {/* Mobile Search Toggle */}
                            <button
                                onClick={() => setSearchOpen(!searchOpen)}
                                className="md:hidden p-2.5 hover:bg-warm-beige rounded-xl transition-colors text-deep-olive"
                            >
                                <span className="material-symbols-outlined">search</span>
                            </button>

                            {/* Language Switcher */}
                            <LanguageSwitcher className="hidden sm:block" />

                            {/* Wishlist */}
                            <Link href="/wishlist" className="hidden sm:flex p-2.5 hover:bg-warm-beige rounded-xl transition-colors text-deep-olive relative">
                                <span className="material-symbols-outlined">favorite</span>
                            </Link>

                            {/* User */}
                            {user ? (
                                <div className="hidden sm:flex items-center gap-2">
                                    <Link href="/profile" className="flex items-center gap-2 px-3 py-2 hover:bg-warm-beige rounded-xl transition-colors">
                                        <div className="size-8 rounded-full bg-gradient-to-br from-primary to-gold-accent flex items-center justify-center text-deep-olive font-bold text-sm">
                                            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                        </div>
                                        <span className="hidden xl:block text-sm font-medium text-deep-olive">{user.name?.split(' ')[0]}</span>
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-xl transition-colors"
                                        title={t("common.logout")}
                                    >
                                        <span className="material-symbols-outlined text-xl">logout</span>
                                    </button>
                                </div>
                            ) : (
                                <Link href="/login" className="hidden sm:flex items-center gap-2 px-4 py-2 text-deep-olive hover:text-primary font-semibold text-sm hover:bg-warm-beige rounded-xl transition-all">
                                    <span className="material-symbols-outlined text-xl">person</span>
                                    <span className="hidden xl:inline">Giriş</span>
                                </Link>
                            )}

                            {/* Cart */}
                            <Link href="/cart" className="flex items-center gap-2 p-2.5 bg-primary hover:bg-primary/90 rounded-xl transition-all relative text-deep-olive">
                                <span className="material-symbols-outlined">shopping_bag</span>
                                {totalItems > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-deep-olive text-white text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full">{totalItems}</span>
                                )}
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Mobile Search Dropdown */}
                {searchOpen && (
                    <div className="md:hidden p-4 border-b border-deep-olive/10 bg-background-light">
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-deep-olive/40">search</span>
                            <input
                                className="w-full pl-12 pr-4 py-3 bg-warm-beige/50 border border-deep-olive/10 rounded-2xl text-sm placeholder:text-deep-olive/50"
                                placeholder="Ne aramıştınız?"
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleSearch}
                                autoFocus
                            />
                        </div>
                    </div>
                )}

                {/* Instagram Story Style Categories */}
                {categories.length > 0 && (
                    <div className="relative bg-gradient-to-b from-warm-beige/30 to-transparent py-4">
                        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
                            <div className="relative">
                                {/* Left Arrow */}
                                <button
                                    onClick={() => scrollStories('left')}
                                    className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 size-8 bg-white shadow-lg rounded-full items-center justify-center text-deep-olive hover:scale-110 transition-transform"
                                >
                                    <span className="material-symbols-outlined text-sm">chevron_left</span>
                                </button>

                                {/* Stories Container */}
                                <div
                                    ref={storiesRef}
                                    className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-2 md:px-8"
                                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                >
                                    {categories.map((cat, index) => (
                                        <Link
                                            key={cat.id}
                                            href={cat.seo_url ? `/kategori/${cat.seo_url}` : `/products?categoryId=${cat.id}`}
                                            className="flex flex-col items-center gap-2 min-w-[80px] group"
                                        >
                                            {/* Instagram Story Ring */}
                                            <div className="relative p-[3px] rounded-full bg-gradient-to-tr from-primary via-gold-accent to-primary group-hover:scale-110 transition-transform duration-300">
                                                <div className="size-16 md:size-[72px] rounded-full bg-white p-[2px] overflow-hidden">
                                                    <div className="relative size-full rounded-full overflow-hidden">
                                                        <Image
                                                            src={cat.image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(cat.name)}&background=C4A962&color=2C3E2D&size=128`}
                                                            alt={cat.name}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                </div>
                                                {/* New indicator */}
                                                {index < 3 && (
                                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-primary text-deep-olive text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase">
                                                        Yeni
                                                    </div>
                                                )}
                                            </div>
                                            <span className="text-[11px] md:text-xs font-semibold text-deep-olive text-center leading-tight max-w-[70px] truncate">
                                                {cat.name}
                                            </span>
                                        </Link>
                                    ))}
                                </div>

                                {/* Right Arrow */}
                                <button
                                    onClick={() => scrollStories('right')}
                                    className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 size-8 bg-white shadow-lg rounded-full items-center justify-center text-deep-olive hover:scale-110 transition-transform"
                                >
                                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </header>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                >
                    <div
                        className="absolute top-0 left-0 w-80 max-w-[85vw] h-full bg-background-light shadow-2xl transform transition-transform duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Mobile Menu Header */}
                        <div className="flex items-center justify-between p-5 border-b border-deep-olive/10 bg-gradient-to-r from-primary/10 to-transparent">
                            <Image
                                src="/logo.png"
                                alt="Olivefe"
                                width={110}
                                height={44}
                                className="h-9 w-auto object-contain"
                            />
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="size-10 flex items-center justify-center hover:bg-warm-beige rounded-xl text-deep-olive"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        {/* User Section */}
                        {user && (
                            <div className="p-5 border-b border-deep-olive/10 bg-warm-beige/30">
                                <div className="flex items-center gap-3">
                                    <div className="size-12 rounded-full bg-gradient-to-br from-primary to-gold-accent flex items-center justify-center text-deep-olive font-bold">
                                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                    </div>
                                    <div>
                                        <p className="font-bold text-deep-olive">{user.name}</p>
                                        <p className="text-xs text-gray-500">{user.email}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Mobile Navigation */}
                        <nav className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 280px)' }}>
                            <ul className="space-y-1">
                                {navLinks.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="flex items-center gap-3 py-3 px-4 text-base font-semibold text-deep-olive hover:bg-primary/10 hover:text-primary rounded-xl transition-colors"
                                        >
                                            {link.icon && <span className="material-symbols-outlined text-xl">{link.icon}</span>}
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        {/* Mobile Menu Footer */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-deep-olive/10 bg-background-light space-y-3">
                            {/* Language Switcher for Mobile */}
                            <div className="flex justify-center">
                                <LanguageSwitcher />
                            </div>

                            {user ? (
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setMobileMenuOpen(false);
                                    }}
                                    className="flex items-center justify-center gap-2 w-full py-3 text-red-500 font-semibold hover:bg-red-50 rounded-xl transition-colors"
                                >
                                    <span className="material-symbols-outlined">logout</span>
                                    Çıkış Yap
                                </button>
                            ) : (
                                <Link
                                    href="/login"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-primary to-gold-accent text-deep-olive font-bold rounded-xl hover:opacity-90 transition-opacity"
                                >
                                    <span className="material-symbols-outlined">login</span>
                                    Giriş Yap
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
