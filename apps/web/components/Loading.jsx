"use client";
import React from 'react';

/**
 * Loading Spinner Component
 */
export function LoadingSpinner({ size = 'md', className = '' }) {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
        xl: 'w-16 h-16'
    };

    return (
        <div className={`inline-block ${sizeClasses[size]} ${className}`}>
            <div className="w-full h-full border-4 border-deep-olive/20 border-t-primary rounded-full animate-spin"></div>
        </div>
    );
}

/**
 * Full Page Loading Component
 */
export function PageLoading({ message = 'Yükleniyor...' }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-warm-beige/30">
            <div className="text-center">
                <LoadingSpinner size="xl" className="mb-4" />
                <p className="text-deep-olive/70 font-medium">
                    {message}
                </p>
            </div>
        </div>
    );
}

/**
 * Skeleton Loader for Product Cards
 */
export function ProductCardSkeleton() {
    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
            {/* Image skeleton */}
            <div className="aspect-[4/5] bg-gray-200"></div>

            {/* Content skeleton */}
            <div className="p-4 space-y-3">
                {/* Category */}
                <div className="h-3 bg-gray-200 rounded w-1/3"></div>

                {/* Title */}
                <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>

                {/* Rating */}
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>

                {/* Price */}
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            </div>
        </div>
    );
}

/**
 * Skeleton Grid for Product List
 */
export function ProductGridSkeleton({ count = 4 }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: count }).map((_, i) => (
                <ProductCardSkeleton key={i} />
            ))}
        </div>
    );
}

/**
 * Button Loading State
 */
export function ButtonLoading({ children, loading, disabled, ...props }) {
    return (
        <button
            {...props}
            disabled={loading || disabled}
            className={`${props.className} ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
        >
            {loading ? (
                <span className="flex items-center justify-center gap-2">
                    <LoadingSpinner size="sm" />
                    {children}
                </span>
            ) : (
                children
            )}
        </button>
    );
}

/**
 * Content Skeleton
 */
export function ContentSkeleton({ lines = 3 }) {
    return (
        <div className="space-y-3 animate-pulse">
            {Array.from({ length: lines }).map((_, i) => (
                <div
                    key={i}
                    className="h-4 bg-gray-200 rounded"
                    style={{ width: i === lines - 1 ? '60%' : '100%' }}
                ></div>
            ))}
        </div>
    );
}

/**
 * Image Skeleton
 */
export function ImageSkeleton({ aspectRatio = 'aspect-square', className = '' }) {
    return (
        <div className={`${aspectRatio} bg-gray-200 animate-pulse rounded ${className}`}></div>
    );
}
