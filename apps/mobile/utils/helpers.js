export const getProductImage = (product) => {
    if (!product) return 'https://via.placeholder.com/300';

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
    return 'https://via.placeholder.com/300';
};

export const formatPrice = (price) => {
    if (price === null || price === undefined) return '0.00 TL';
    return `${parseFloat(price).toFixed(2)} TL`;
};
