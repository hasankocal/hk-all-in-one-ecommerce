import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Product from '../models/Product';
import Category from '../models/Category';

export const getProducts = async (req: Request, res: Response) => {
    try {
        console.log('DEBUG: getProducts called with query:', req.query);
        const { categoryId, search, page, limit } = req.query;
        const whereClause: any = {};

        if (categoryId) {
            whereClause.categoryId = categoryId;
        }

        if (search) {
            whereClause.name = { [Op.like]: `%${search}%` };
        }

        // Pagination Logic only if 'page' is provided
        if (page) {
            const limitVal = parseInt(limit as string) || 10;
            const offsetVal = (parseInt(page as string) - 1) * limitVal;

            console.log(`Pagination active: page=${page}, limit=${limitVal}, offset=${offsetVal}`);

            const { count, rows } = await Product.findAndCountAll({
                where: whereClause,
                include: [{ model: Category, attributes: ['id', 'name'] }],
                limit: limitVal,
                offset: offsetVal,
                order: [['createdAt', 'DESC']]
            });

            return res.json({
                products: rows,
                total: count,
                totalPages: Math.ceil(count / limitVal),
                currentPage: parseInt(page as string)
            });
        }

        // Legacy Mode (No pagination -> Return Array)
        const products = await Product.findAll({
            where: whereClause,
            include: [{ model: Category, attributes: ['id', 'name'] }],
            order: [['createdAt', 'DESC']]
        });
        res.json(products);

    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(Number(id), {
            include: [{ model: Category, attributes: ['id', 'name'] }],
        });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const createProduct = async (req: Request, res: Response) => {
    // Basic implementation for testing/seeding via API if needed
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error: any) {
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
}
