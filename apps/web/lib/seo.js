/**
 * Generate SEO metadata for pages
 * @param {Object} params - Page parameters
 * @param {string} params.title - Page title
 * @param {string} params.description - Page description
 * @param {string} params.path - Page path (e.g., '/products/123')
 * @param {string} params.image - OG image URL
 * @param {string} params.type - OG type (default: 'website')
 * @returns {Object} Next.js metadata object
 */
export function generateMetadata({
    title,
    description,
    path = '',
    image,
    type = 'website',
    keywords = [],
}) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://olivefe.com.tr';
    const url = `${baseUrl}${path}`;
    const defaultImage = `${baseUrl}/og-image.jpg`;
    const ogImage = image || defaultImage;

    const defaultKeywords = [
        'zeytinyağı',
        'kuru incir',
        'Aydın',
        'doğal ürünler',
        'organik',
        'Ege',
        'Olivefe',
    ];

    return {
        title,
        description,
        keywords: [...defaultKeywords, ...keywords],
        authors: [{ name: 'Olivefe' }],
        creator: 'Olivefe',
        publisher: 'Olivefe',
        metadataBase: new URL(baseUrl),
        alternates: {
            canonical: url,
        },
        openGraph: {
            title,
            description,
            url,
            siteName: 'Olivefe',
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
            locale: 'tr_TR',
            type,
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [ogImage],
            creator: '@olivefe',
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    };
}

/**
 * Generate JSON-LD structured data for products
 */
export function generateProductSchema(product) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://olivefe.com.tr';

    return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.description || product.name,
        image: product.images?.[0] || product.image,
        sku: product.id?.toString(),
        offers: {
            '@type': 'Offer',
            url: `${baseUrl}/products/${product.seo_url || product.id}`,
            priceCurrency: 'TRY',
            price: product.price,
            availability: product.stock > 0
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock',
            seller: {
                '@type': 'Organization',
                name: 'Olivefe',
            },
        },
        aggregateRating: product.rating ? {
            '@type': 'AggregateRating',
            ratingValue: product.rating,
            reviewCount: product.reviewCount || 0,
        } : undefined,
    };
}

/**
 * Generate JSON-LD structured data for organization
 */
export function generateOrganizationSchema() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://olivefe.com.tr';

    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Olivefe',
        url: baseUrl,
        logo: `${baseUrl}/logo.png`,
        description: "Aydın'dan doğal ve organik zeytinyağı, kuru incir ve daha fazlası.",
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Aydın',
            addressCountry: 'TR',
        },
        contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'Customer Service',
            availableLanguage: 'Turkish',
        },
        sameAs: [
            'https://www.facebook.com/olivefe',
            'https://www.instagram.com/olivefe',
            'https://twitter.com/olivefe',
        ],
    };
}

/**
 * Generate JSON-LD breadcrumb list
 */
export function generateBreadcrumbSchema(items) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://olivefe.com.tr';

    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: `${baseUrl}${item.path}`,
        })),
    };
}
