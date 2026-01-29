import { Request, Response } from 'express';
import Wishlist from '../models/Wishlist';
import Product from '../models/Product';

export const getWishlist = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id; // Guaranteed by middleware
        const wishlist = await Wishlist.findAll({
            where: { userId },
            include: [{
                model: Product,
                attributes: ['id', 'name', 'price', 'images', 'categoryId']
            }],
            order: [['createdAt', 'DESC']]
        });

        // Transform structure closer to what frontend expects (list of products)
        // Note: Wishlist items include generic Model methods; we need to access the associated Product
        const products = wishlist.map((item: any) => item.Product);
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching wishlist' });
    }
};

export const toggleWishlist = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;
        const { productId } = req.body;

        const existing = await Wishlist.findOne({ where: { userId, productId } });

        if (existing) {
            await existing.destroy();
            return res.json({ message: 'Removed from wishlist', action: 'removed' });
        } else {
            await Wishlist.create({ userId, productId });
            return res.json({ message: 'Added to wishlist', action: 'added' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error toggling wishlist' });
    }
};
