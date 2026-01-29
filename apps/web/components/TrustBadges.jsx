"use client";
import React from "react";
import { useTranslation } from "@/context/LanguageContext";

const badges = [
    {
        icon: "eco",
        titleKey: "trustBadges.naturalProduction",
        descKey: "trustBadges.naturalProductionDesc",
        color: "from-green-500 to-emerald-600"
    },
    {
        icon: "local_shipping",
        titleKey: "trustBadges.sameDayShipping",
        descKey: "trustBadges.sameDayShippingDesc",
        color: "from-blue-500 to-cyan-600"
    },
    {
        icon: "inventory_2",
        titleKey: "trustBadges.securePackaging",
        descKey: "trustBadges.securePackagingDesc",
        color: "from-amber-500 to-orange-600"
    },
    {
        icon: "payments",
        titleKey: "trustBadges.cashOnDelivery",
        descKey: "trustBadges.cashOnDeliveryDesc",
        color: "from-purple-500 to-violet-600"
    }
];

export default function TrustBadges({ className = "" }) {
    const { t } = useTranslation();

    return (
        <section className={`py-8 md:py-12 ${className}`}>
            <div className="max-w-[1400px] mx-auto px-4 md:px-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {badges.map((badge, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-lg border border-deep-olive/5 hover:border-primary/20 transition-all duration-300"
                        >
                            <div className="flex flex-col items-center text-center gap-3">
                                {/* Icon with gradient background */}
                                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${badge.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    <span className="material-symbols-outlined text-white text-2xl md:text-3xl">
                                        {badge.icon}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="font-bold text-sm md:text-base text-deep-olive leading-tight">
                                    {t(badge.titleKey)}
                                </h3>

                                {/* Description */}
                                <p className="text-xs md:text-sm text-deep-olive/60 leading-relaxed">
                                    {t(badge.descKey)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
