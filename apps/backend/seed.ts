import sequelize from './config/database.js';
import { User, Category, Product } from './models/index.js';
import bcrypt from 'bcryptjs';

const seedDatabase = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log('Database synced!');

        // Create Categories
        const zeytinyaglari = await Category.create({
            name: 'Zeytinyağları',
            description: 'Doğal, saf ve lezzetli zeytinyağları.',
            image_url: 'https://olivefe.com.tr/wp-content/uploads/2023/05/43-5lt-z.yagi_-600x901.jpg',
        });

        const zeytinler = await Category.create({
            name: 'Zeytinler',
            description: 'Kahvaltılarınızın vazgeçilmezi doğal zeytinler.',
            image_url: 'https://olivefe.com.tr/wp-content/uploads/2023/05/41-yoresel-zeytin_-600x901.jpg',
        });

        const kahvaltiliklar = await Category.create({
            name: 'Kahvaltılıklar',
            description: 'Reçeller, soslar ve yöresel lezzetler.',
            image_url: 'https://olivefe.com.tr/wp-content/uploads/2023/05/49-incir-receli-600x901.jpg',
        });

        const dogalYasam = await Category.create({
            name: 'Doğal Yaşam',
            description: 'Sabunlar, yağlar ve doğal sular.',
            image_url: 'https://olivefe.com.tr/wp-content/uploads/2023/05/2-kantoron-yagi-600x901.jpg',
        });

        const atistirmaliklar = await Category.create({
            name: 'Atıştırmalıklar',
            description: 'Kuru meyveler ve sağlıklı atıştırmalıklar.',
            image_url: 'https://olivefe.com.tr/wp-content/uploads/2023/05/incir-cipsi-600x901.jpg',
        });

        const diger = await Category.create({
            name: 'Diğer',
            description: 'Turşular, Erişteler ve daha fazlası.',
            image_url: 'https://olivefe.com.tr/wp-content/uploads/2025/07/IMG_4002-600x450.jpeg',
        });

        console.log('Categories created!');

        // --- Zeytinyağları ---
        await Product.create({
            name: 'Naturel Sızma Zeytinyağı (5 Lt.) Teneke',
            description: 'Aydın yöresine ait Memecik cinsi Zeytinler yerle temas etmeden kasalara toplanır. Aynı gün fabrikaya götürülür, kontinu sistemde otomatik makinalarda sıkımı yapılır. Naturel sızma zeytinyağı maksimum %0.8 oleik asit değerine sahip bitkisel bir yağdır.',
            price: 2400.00,
            sale_price: 2250.00,
            stock_quantity: 100,
            categoryId: zeytinyaglari.id,
            images: ['https://olivefe.com.tr/wp-content/uploads/2023/05/43-5lt-z.yagi_-600x901.jpg'],
        });

        await Product.create({
            name: 'Erken Hasat Naturel Sızma Zeytinyağı (750 Ml.) Cam',
            description: 'Yeşilken kasalara toplanan Memecik cinsi zeytinlerden aynı gün sıkılarak üretilmiştir. Yüksek fenolik bileşenler ve düşük asit oranına sahiptir. Meyvemsi, acılık ve yakıcılık özellikleri ile çiğ tüketime uygundur.',
            price: 675.00,
            stock_quantity: 50,
            categoryId: zeytinyaglari.id,
            images: ['https://olivefe.com.tr/wp-content/uploads/2023/05/37-750z.yagi_-600x901.jpg'],
        });

        await Product.create({
            name: 'Naturel Yemeklik Zeytinyağı (2 LT.) Pet',
            description: 'Aydın yöresi Memecik cinsi zeytinlerden kontinu sistemde üretilmiştir. %0.8 – 2.0 arası asit değerine sahiptir. Sıcak yemekler ve kızartmalar için idealdir.',
            price: 800.00,
            stock_quantity: 75,
            categoryId: zeytinyaglari.id,
            images: ['https://olivefe.com.tr/wp-content/uploads/2023/05/42-2lt-pet_-600x901.jpg'],
        });

        // --- Zeytinler ---
        await Product.create({
            name: 'Domat Yeşil Kırma Zeytin (1400 gr.) Pet',
            description: 'Zeytinler yeşilken 3.5-4 numara elek aralığında, beresiz ve sağlam olanlar toplanır. Temiz taş üzerine konulup zeytin kırma tahtalarıyla vurularak kırılır.',
            price: 350.00,
            stock_quantity: 100,
            categoryId: zeytinler.id,
            images: ['https://olivefe.com.tr/wp-content/uploads/2023/05/33-kirmazeytin-600x901.jpg'],
        });

        await Product.create({
            name: 'Domat Yeşil Çizik Zeytin (1400 gr.) Pet',
            description: 'Yeşilken toplanan sağlam zeytinlerin 2-3 boyuna çizik atılmasıyla hazırlanır. Doğal fermantasyon yöntemi ile tatlandırılmıştır.',
            price: 350.00,
            stock_quantity: 200,
            categoryId: zeytinler.id,
            images: ['https://olivefe.com.tr/wp-content/uploads/2023/05/46-cizik2-600x901.jpg'],
        });

        await Product.create({
            name: 'Yöresel Yağlı Zeytin (1 kg.)',
            description: 'Siyahtan yeşile geçiş evresinde toplanan zeytinlerin baskı yöntemiyle acı suyunun çıkarılması ve doğal yöntemlerle tatlandırılmasıyla elde edilir.',
            price: 500.00,
            stock_quantity: 150,
            categoryId: zeytinler.id,
            images: ['https://olivefe.com.tr/wp-content/uploads/2023/05/41-yoresel-zeytin_-600x901.jpg'],
        });

        // --- Kahvaltılıklar ---
        await Product.create({
            name: 'Karadut Reçeli (450 Gr.)',
            description: 'Doğal karadut meyvelerinden üretilen ev yapımı tadında reçel.',
            price: 250.00,
            stock_quantity: 40,
            categoryId: kahvaltiliklar.id,
            images: ['https://olivefe.com.tr/wp-content/uploads/2023/04/f12-scaled-600x901.jpg'],
        });

        await Product.create({
            name: 'Nar Ekşisi (300 Gr.)',
            description: '%100 doğal narlardan elde edilen geleneksel nar ekşisi.',
            price: 300.00,
            stock_quantity: 60,
            categoryId: kahvaltiliklar.id,
            images: ['https://olivefe.com.tr/wp-content/uploads/2023/04/40-nareksisi-600x901.jpg'],
        });

        await Product.create({
            name: 'Zahter (Zeytinyağında) 270 gr.',
            description: 'Naturel sızma zeytinyağı içerisinde taze zahter.',
            price: 200.00,
            stock_quantity: 50,
            categoryId: kahvaltiliklar.id,
            images: ['https://olivefe.com.tr/wp-content/uploads/2023/07/zahter2-600x600.jpg'],
        });

        // --- Doğal Yaşam ---
        await Product.create({
            name: 'Kantaron Yağı (250 cc.)',
            description: 'Naturel sızma zeytinyağında bekletilmiş sarı kantaron yağı.',
            price: 300.00,
            stock_quantity: 30,
            categoryId: dogalYasam.id,
            images: ['https://olivefe.com.tr/wp-content/uploads/2023/05/2-kantoron-yagi-600x901.jpg'],
        });

        await Product.create({
            name: 'Kekik Suyu (228 gr.)',
            description: 'Damıltma yoluyla elde edilen saf kekik suyu.',
            price: 100.00,
            stock_quantity: 40,
            categoryId: dogalYasam.id,
            images: ['https://olivefe.com.tr/wp-content/uploads/2023/05/1-kekiksuyu-600x901.jpg'],
        });

        await Product.create({
            name: 'Doğal Zeytinyağı Sabunu (Tekli)',
            description: 'Saf zeytinyağından üretilen geleneksel banyo sabunu.',
            price: 100.00,
            stock_quantity: 100,
            categoryId: dogalYasam.id,
            images: ['https://olivefe.com.tr/wp-content/uploads/2023/05/HMT_7656-scaled-e1712408812635-600x575.jpg'],
        });

        // --- Atıştırmalıklar ---
        await Product.create({
            name: 'Taze İncir Cipsi (Kurutulmuş)',
            description: 'İnce dilimlenmiş ve kurutulmuş taze incir cipsi.',
            price: 200.00, // Estimated
            stock_quantity: 50,
            categoryId: atistirmaliklar.id,
            images: ['https://olivefe.com.tr/wp-content/uploads/2023/05/incir-cipsi-600x901.jpg'], // Using a generic or found image
        });

        await Product.create({
            name: 'Mürdüm Eriği Kurusu (200 gr.)',
            description: 'Doğal yöntemlerle kurutulmuş mürdüm eriği.',
            price: 150.00, // Estimated
            stock_quantity: 50,
            categoryId: atistirmaliklar.id,
            images: ['https://olivefe.com.tr/wp-content/uploads/2023/05/erik-kurusu-600x901.jpg'], // Placeholder/Guessed url pattern if exact not found
        });

        await Product.create({
            name: 'Çilek Kurusu (50 gr.)',
            description: 'Mevsiminde toplanıp kurutulmuş çilek dilimleri.',
            price: 100.00, // Estimated
            stock_quantity: 50,
            categoryId: atistirmaliklar.id,
            images: ['https://olivefe.com.tr/wp-content/uploads/2023/05/cilek-kurusu-600x901.jpg'],
        });


        // --- Diğer ---
        await Product.create({
            name: 'Yuvarlama (500 gr.)',
            description: 'Geleneksel yöntemlerle hazırlanan yöresel yuvarlama.',
            price: 350.00,
            stock_quantity: 20,
            categoryId: diger.id,
            images: ['https://olivefe.com.tr/wp-content/uploads/2025/07/IMG_4002-600x450.jpeg'],
        });

        await Product.create({
            name: 'Kaşık Turşu (660 gr.)',
            description: 'İnce kıyılmış karışık sebzelerden oluşan kaşık turşusu.',
            price: 150.00, // Estimated
            stock_quantity: 60,
            categoryId: diger.id,
            images: ['https://olivefe.com.tr/wp-content/uploads/2023/05/7-kasik-tursu-600x901.jpg'],
        });

        await Product.create({
            name: 'Çanak Enginar 12’li',
            description: 'Taze ve özenle ayıklanmış çanak enginar.',
            price: 1000.00,
            stock_quantity: 10,
            categoryId: diger.id,
            images: ['https://olivefe.com.tr/wp-content/uploads/2024/05/enginar-600x902.jpg'],
        });



        console.log('Products created!');

        // Create Admin User
        const hashedPassword = await bcrypt.hash('123456', 10);
        await User.create({
            name: 'Hasan Kocal',
            email: 'admin@example.com',
            password: hashedPassword,
            role: 'admin',
        });

        console.log('Admin user created (email: admin@example.com, password: 123456)!');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
