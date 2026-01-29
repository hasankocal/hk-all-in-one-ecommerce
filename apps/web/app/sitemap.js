export default async function sitemap() {
    const baseUrl = 'https://olivefe.com.tr'

    // Static pages
    const staticPages = [
        '',
        '/hikayemiz',
        '/iletisim',
        '/sss',
        '/gizlilik-politikasi',
        '/kvkk',
        '/iade-kosullari',
        '/teslimat-kosullari',
        '/toptan-satis',
        '/siparis-takip',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: route === '' ? 1 : 0.8,
    }))

    // TODO: Fetch dynamic pages from API
    // - Products
    // - Categories
    // - Blog posts

    return [...staticPages]
}
