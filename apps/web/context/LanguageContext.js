"use client";
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

// Import translations
import trTranslations from "@/locales/tr.json";
import enTranslations from "@/locales/en.json";

const translations = {
    tr: trTranslations,
    en: enTranslations
};

const SUPPORTED_LOCALES = ["tr", "en"];
const DEFAULT_LOCALE = "tr";
const STORAGE_KEY = "olivefe_language";

const LanguageContext = createContext(undefined);

export function LanguageProvider({ children }) {
    const [locale, setLocaleState] = useState(DEFAULT_LOCALE);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load saved language on mount
    useEffect(() => {
        const savedLocale = localStorage.getItem(STORAGE_KEY);
        if (savedLocale && SUPPORTED_LOCALES.includes(savedLocale)) {
            setLocaleState(savedLocale);
        }
        setIsLoaded(true);
    }, []);

    // Save language to localStorage
    const setLocale = useCallback((newLocale) => {
        if (SUPPORTED_LOCALES.includes(newLocale)) {
            setLocaleState(newLocale);
            localStorage.setItem(STORAGE_KEY, newLocale);
            // Update html lang attribute
            document.documentElement.lang = newLocale;
        }
    }, []);

    // Get translation by key path (e.g., "common.search")
    const t = useCallback((keyPath, params = {}) => {
        const keys = keyPath.split(".");
        let value = translations[locale];

        for (const key of keys) {
            if (value && typeof value === "object" && key in value) {
                value = value[key];
            } else {
                // Fallback to default locale
                value = translations[DEFAULT_LOCALE];
                for (const k of keys) {
                    if (value && typeof value === "object" && k in value) {
                        value = value[k];
                    } else {
                        return keyPath; // Return key if not found
                    }
                }
                break;
            }
        }

        // Replace parameters like {count}
        if (typeof value === "string" && Object.keys(params).length > 0) {
            return value.replace(/\{(\w+)\}/g, (match, key) => {
                return params[key] !== undefined ? params[key] : match;
            });
        }

        return value || keyPath;
    }, [locale]);

    const value = {
        locale,
        setLocale,
        t,
        isLoaded,
        supportedLocales: SUPPORTED_LOCALES,
        localeNames: {
            tr: "Türkçe",
            en: "English"
        }
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}

// Convenience hook for translations only
export function useTranslation() {
    const { t, locale } = useLanguage();
    return { t, locale };
}
