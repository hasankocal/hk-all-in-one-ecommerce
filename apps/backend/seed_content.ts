import sequelize from './config/database.js';
import { Slide, BlogPost } from './models/index.js';

const seedContent = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        // await sequelize.sync({ force: true }); // Careful!

        // Slides
        const slidesCount = await Slide.count();
        if (slidesCount === 0) {
            await Slide.bulkCreate([
                {
                    image: 'https://images.unsplash.com/photo-1598918237276-f8441d017772?q=80&w=1974&auto=format&fit=crop',
                    title: 'Soğuk Sıkım Mucizesi',
                    subtitle: 'Erken hasat, yüksek polifenol.',
                    buttonText: 'Hemen Keşfet',
                    link: '/shop/category/1',
                    order: 1
                },
                {
                    image: 'https://images.unsplash.com/photo-1627915525946-b78f4477926b?q=80&w=2670&auto=format&fit=crop',
                    title: 'Doğadan Sofranıza',
                    subtitle: '%100 Naturel Sızma Zeytinyağı',
                    buttonText: 'Lezzeti Gör',
                    link: '/shop/category/2',
                    order: 2
                },
                {
                    image: 'https://images.unsplash.com/photo-1606612051390-2c70d473cf6d?q=80&w=2670&auto=format&fit=crop',
                    title: 'Saf & Doğal Bakım',
                    subtitle: 'El yapımı zeytinyağlı sabunlar.',
                    buttonText: 'İncele',
                    link: '/shop/category/3',
                    order: 3
                }
            ]);
            console.log('Slides seeded.');
        }

        // Blog Posts
        const blogCount = await BlogPost.count();
        if (blogCount === 0) {
            await BlogPost.bulkCreate([
                {
                    title: 'Erken Hasat Zeytinyağının Sırrı',
                    excerpt: 'Zeytinler henüz yeşilken toplandığında elde edilen yağın asit oranı ve polifenol değeri neden daha değerlidir?',
                    content: '<h1>Erken Hasat Hakkında</h1><p>Detaylı içerik buraya gelecek...</p>',
                    image: 'https://olivefe.com.tr/wp-content/uploads/2023/05/37-750z.yagi_-600x901.jpg',
                    publishedAt: new Date()
                },
                {
                    title: 'Soğuk Sıkım Nedir?',
                    excerpt: 'Zeytinyağı üretiminde sıcaklık 27 dereceyi geçmemeli. Soğuk sıkım tekniğinin sağlık üzerindeki etkileri.',
                    content: '<h1>Soğuk Sıkım</h1><p>Besin değerleri korunur...</p>',
                    image: 'https://olivefe.com.tr/wp-content/uploads/2023/05/43-5lt-z.yagi_-600x901.jpg',
                    publishedAt: new Date()
                },
                {
                    title: 'Ege Mutfağının Vazgeçilmezi: Zeytin',
                    excerpt: 'Kahvaltılardan salatalara, Ege sofralarının baş tacı olan zeytinin yolculuğu.',
                    content: '<h1>Zeytin Kültürü</h1><p>Ege demek zeytin demektir...</p>',
                    image: 'https://olivefe.com.tr/wp-content/uploads/2023/05/41-yoresel-zeytin_-600x901.jpg',
                    publishedAt: new Date()
                }
            ]);
            console.log('Blog posts seeded.');
        }

        console.log('Content seeding completed.');
        process.exit();
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};

seedContent();
