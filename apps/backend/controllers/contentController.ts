import { Request, Response } from 'express';
import Slide from '../models/Slide';
import BlogPost from '../models/BlogPost';

export const getSlides = async (req: Request, res: Response) => {
    try {
        const slides = await Slide.findAll({
            order: [['order', 'ASC']]
        });
        res.json(slides);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching slides', error: error.message });
    }
};

export const getBlogPosts = async (req: Request, res: Response) => {
    try {
        const posts = await BlogPost.findAll({
            order: [['publishedAt', 'DESC']]
        });
        res.json(posts);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching blog posts', error: error.message });
    }
};

export const getBlogPostById = async (req: Request, res: Response) => {
    try {
        const post = await BlogPost.findByPk(Number(req.params.id));
        if (!post) {
            return res.status(404).json({ message: 'Blog post not found' });
        }
        res.json(post);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching blog post', error: error.message });
    }
};
