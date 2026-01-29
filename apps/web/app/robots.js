export default function robots() {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/admin/', '/_next/'],
            },
        ],
        sitemap: 'https://olivefe.com.tr/sitemap.xml',
    }
}
