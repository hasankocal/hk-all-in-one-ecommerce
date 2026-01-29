export const getProductImage = (product) => {
    if (!product) return 'https://placehold.co/400x500';

    try {
        // 1. Check direct 'image' property (legacy or single image)
        if (product.image && typeof product.image === 'string' && product.image.startsWith('http')) {
            return product.image;
        }

        // 2. Check 'images' property
        const imgs = product.images;

        // If it's already an array
        if (Array.isArray(imgs) && imgs.length > 0) {
            return imgs[0];
        }

        // If it's a string
        if (typeof imgs === 'string') {
            // Case A: It's a JSON stringified array (e.g. "[\"http...\"]")
            if (imgs.trim().startsWith('[')) {
                const parsed = JSON.parse(imgs);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    return parsed[0];
                }
            }
            // Case B: It's a direct URL string (e.g. "http...")
            if (imgs.startsWith('http')) {
                return imgs;
            }
        }
    } catch (error) {
        console.error('Error parsing product image:', error);
    }

    // Fallback
    return 'https://placehold.co/400x500';
};

/**
 * Format price to a consistent number format
 * @param {string|number} price - Price value
 * @returns {number} - Formatted price as number
 */
export const formatPrice = (price) => {
    if (typeof price === 'number') return price;
    return parseFloat(price || 0);
};

/**
 * Format currency with Turkish Lira symbol
 * @param {string|number} price - Price value
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {string} - Formatted currency string
 */
export const formatCurrency = (price, decimals = 2) => {
    const numPrice = formatPrice(price);
    return `${numPrice.toFixed(decimals)} ₺`;
};

