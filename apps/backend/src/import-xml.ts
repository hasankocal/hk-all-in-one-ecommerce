import fs from 'fs';
// @ts-ignore
import { XMLParser } from 'fast-xml-parser';
import sequelize from '../config/database';
import Product from '../models/Product';
import Category from '../models/Category';

// Helper function to extract CDATA and clean
const cleanText = (text: any) => {
    if (!text) return '';
    return typeof text === 'string' ? text.replace(/<!\[CDATA\[|\]\]>/g, '').trim() : String(text);
};

const importData = async () => {
    try {
        console.log('Veritabanına bağlanılıyor...');
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('Veritabanına bağlantı başarılı.');

        let xmlFile = fs.readFileSync('products-import.xml', 'utf8');

        // Regex ile XML <item> parçalarını bul
        const itemRegex = /<item>([\s\S]*?)<\/item>/g;
        let match;
        let productsCount = 0;

        console.log(`Veriler ayıklanıyor (Regex Modu)...`);

        while ((match = itemRegex.exec(xmlFile)) !== null) {
            const itemHtml = match[1];

            // wp:status publish ve wp:post_type product kontrolü
            const statusMatch = itemHtml.match(/<wp:status><!\[CDATA\[(.*?)\]\]><\/wp:status>/);
            const typeMatch = itemHtml.match(/<wp:post_type><!\[CDATA\[(.*?)\]\]><\/wp:post_type>/);

            const status = statusMatch ? statusMatch[1] : '';
            const type = typeMatch ? typeMatch[1] : '';

            if (status !== 'publish' || type !== 'product') continue;

            // Product Title
            const titleMatch = itemHtml.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) || itemHtml.match(/<title>(.*?)<\/title>/);
            const title = titleMatch ? titleMatch[1] : 'Adsız Ürün';

            // Slug
            const slugMatch = itemHtml.match(/<wp:post_name><!\[CDATA\[(.*?)\]\]><\/wp:post_name>/);
            const slug = slugMatch ? slugMatch[1] : 'urun-' + Date.now();

            // Price
            // WordPress XML içerisinde postmeta yapıları yan yanadır
            const priceRegex = /<wp:meta_key><!\[CDATA\[_price\]\]><\/wp:meta_key>\s*<wp:meta_value><!\[CDATA\[(.*?)\]\]><\/wp:meta_value>/;
            const priceMatch = itemHtml.match(priceRegex);
            const price = priceMatch ? parseFloat(priceMatch[1]) || 0 : 0;

            // Kategori
            const catRegex = /<category domain="product_cat" nicename="(.*?)"><!\[CDATA\[(.*?)\]\]><\/category>/;
            const catMatch = itemHtml.match(catRegex);
            const catName = catMatch ? catMatch[2] : 'Genel';

            // Kategori ID bul veya oluştur
            let categoryId: number | undefined = undefined;
            if (catName) {
                const [cat] = await Category.findOrCreate({
                    where: { name: catName },
                    defaults: { name: catName, description: catName + ' Kategorisi', image_url: 'https://olivefe.com.tr/wp-content/uploads/2023/01/logo-100x100.png' }
                });
                categoryId = cat.id;
            }

            const image_url = `https://olivefe.com.tr/wp-content/uploads/2023/05/${slug}.jpg`;

            console.log(`İşleniyor: ${title} - KategoriID: ${categoryId} - Fiyat: ${price}`);

            await Product.create({
                name: title,
                description: title,
                price: price,
                imageUrl: image_url, // WordPress'ten tahmini klasör
                categoryId: categoryId
            } as any);

            productsCount++;
        }

        console.log(`İçeri Aktarma İşlemi (Import) tamamlandı! Toplam İşlenen Ürün: ${productsCount} ✅`);
        process.exit(0);

    } catch (error) {
        console.error('İçe aktarma hatası:', error);
        process.exit(1);
    }
};

importData();
