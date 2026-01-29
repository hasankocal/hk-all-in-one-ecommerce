"use client";
import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function LanguageSwitcher({ className = "" }) {
    const { locale, setLocale, localeNames, supportedLocales } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (newLocale) => {
        setLocale(newLocale);
        setIsOpen(false);
    };

    // Flag emojis for locales
    const flags = {
        tr: "🇹🇷",
        en: "🇬🇧"
    };

    return (
        <div ref={dropdownRef} className={`relative ${className}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 px-2 py-1.5 text-sm font-medium text-deep-olive hover:bg-warm-beige rounded-lg transition-colors"
            >
                <span className="text-base">{flags[locale]}</span>
                <span className="hidden sm:inline uppercase">{locale}</span>
                <span className="material-symbols-outlined text-sm">expand_more</span>
            </button>

            {isOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-lg border border-deep-olive/10 overflow-hidden z-50 min-w-[140px]">
                    {supportedLocales.map((loc) => (
                        <button
                            key={loc}
                            onClick={() => handleSelect(loc)}
                            className={`w-full flex items-center gap-2 px-3 py-2.5 text-sm text-left hover:bg-warm-beige transition-colors ${locale === loc ? "bg-primary/10 text-primary font-semibold" : "text-deep-olive"
                                }`}
                        >
                            <span className="text-base">{flags[loc]}</span>
                            <span>{localeNames[loc]}</span>
                            {locale === loc && (
                                <span className="material-symbols-outlined text-primary text-sm ml-auto">check</span>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
