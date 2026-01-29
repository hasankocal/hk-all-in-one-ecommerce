import { Request, Response } from 'express';
import Category from '../models/Category';
import Product from '../models/Product';

export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const getCategoryBySeoUrl = async (req: Request, res: Response) => {
    try {
        const { seo_url } = req.params;
        const category = await Category.findOne({ where: { seo_url } });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(category);
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const getProductsByCategory = async (req: Request, res: Response) => {
    try {
        const { seo_url } = req.params;
        const category = await Category.findOne({ where: { seo_url } });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        const products = await Product.findAll({
            where: { categoryId: category.id },
            include: [{ model: Category, attributes: ['id', 'name', 'seo_url'] }]
        });

        res.json({ category, products });
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const createCategory = async (req: Request, res: Response) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json(category);
    } catch (error: any) {
        res.status(500).json({ message: 'Error creating category', error: error.message });
    }
}

