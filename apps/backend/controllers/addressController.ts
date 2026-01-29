import { Request, Response } from 'express';
import Address from '../models/Address';

export const getAddresses = async (req: Request, res: Response) => {
    try {
        const addresses = await Address.findAll({
            where: { userId: req.user!.id },
            order: [['createdAt', 'DESC']]
        });
        res.json(addresses);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching addresses', error: error.message });
    }
};

export const addAddress = async (req: Request, res: Response) => {
    try {
        const { title, full_address, city, district, phone } = req.body;

        if (!title || !full_address || !city || !district || !phone) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }

        const address = await Address.create({
            userId: req.user!.id,
            title,
            full_address,
            city,
            district,
            phone,
            is_default: false, // Provide default or get from body if needed
        });

        res.status(201).json(address);
    } catch (error: any) {
        res.status(500).json({ message: 'Error adding address', error: error.message });
    }
};

export const deleteAddress = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const address = await Address.findByPk(Number(id));

        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }

        if (address.userId !== req.user!.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await address.destroy();
        res.json({ message: 'Address deleted' });
    } catch (error: any) {
        res.status(500).json({ message: 'Error deleting address', error: error.message });
    }
};
