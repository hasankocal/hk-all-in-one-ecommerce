import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database';
import './models/index'; // Import models to initialize associations
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import categoryRoutes from './routes/categoryRoutes';
import orderRoutes from './routes/orderRoutes';
import addressRoutes from './routes/addressRoutes';
import couponRoutes from './routes/couponRoutes';
import contentRoutes from './routes/contentRoutes';
import wishlistRoutes from './routes/wishlistRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/coupons', couponRoutes);

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Welcome to HK Expo Ecommerce API' });
});

// Database Connection and Server Start
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');

        // CLI Argümanı kontrolü (XML İçeri aktarımı)
        if (process.argv.includes('--import-xml')) {
            console.log('XML İçe aktarma (Import) Modu Başlatılıyor...');
            // Burada import mantığını içeren fonksiyonu tetikleyeceğiz
            try {
                const { importData } = require('./src/import-xml');
                await importData();
            } catch (e) {
                console.log("Import script hata", e);
            }
            return;
        }

        // Sync models
        await sequelize.sync();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}.`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

startServer();
