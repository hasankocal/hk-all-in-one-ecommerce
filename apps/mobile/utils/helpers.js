import Config from '../constants/Config';

export const getProductImage = (product) => {
    if (!product) return 'https://via.placeholder.com/300';

    try {
        let imgPath = null;

        // 1. Check direct 'image' property (legacy or single image)
        if (product.image && typeof product.image === 'string') {
            imgPath = product.image;
        }

        // 2. Check 'images' property
        if (!imgPath && product.images) {
            const imgs = product.images;
            if (Array.isArray(imgs) && imgs.length > 0) {
                imgPath = imgs[0];
            } else if (typeof imgs === 'string') {
                if (imgs.trim().startsWith('[')) {
                    const parsed = JSON.parse(imgs);
                    if (Array.isArray(parsed) && parsed.length > 0) {
                        imgPath = parsed[0];
                    }
                } else {
                    imgPath = imgs;
                }
            }
        }

        if (imgPath) {
            if (imgPath.startsWith('http')) {
                return imgPath;
            } else if (imgPath.startsWith('/')) {
                return `${Config.BASE_URL}${imgPath}`;
            }
            return `${Config.BASE_URL}/${imgPath}`;
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
