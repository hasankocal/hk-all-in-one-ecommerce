import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Coupon from '../models/Coupon';

export const validateCoupon = async (req: Request, res: Response) => {
    try {
        const { code, cartTotal } = req.body;

        if (!code) {
            return res.status(400).json({ message: 'Kupon kodu gerekli.' });
        }

        const coupon = await Coupon.findOne({
            where: {
                code: code,
                isActive: true,
                expirationDate: {
                    [Op.or]: [
                        { [Op.gt]: new Date() },
                        null
                    ]
                } as any
            }
        });

        if (!coupon) {
            return res.status(404).json({ message: 'Geçersiz veya süresi dolmuş kupon kodu.' });
        }

        if (cartTotal && parseFloat(cartTotal) < Number(coupon.minOrderAmount)) {
            return res.status(400).json({
                message: `Bu kuponu kullanmak için sepet tutarı en az ₺${coupon.minOrderAmount} olmalıdır.`
            });
        }

        // Calculate discount
        let discountAmount = 0;
        if (coupon.discountType === 'percent') {
            discountAmount = (parseFloat(cartTotal) * Number(coupon.discountValue)) / 100;
        } else {
            discountAmount = Number(coupon.discountValue);
        }

        // Ensure discount doesn't exceed cart total
        if (discountAmount > parseFloat(cartTotal)) {
            discountAmount = parseFloat(cartTotal);
        }

        res.json({
            success: true,
            code: coupon.code,
            discountType: coupon.discountType,
            discountValue: coupon.discountValue,
            discountAmount: discountAmount.toFixed(2),
            message: 'Kupon başarıyla uygulandı!',
        });

    } catch (error: any) {
        console.error('Coupon validation error:', error);
        res.status(500).json({ message: 'Kupon doğrulanırken bir hata oluştu.' });
    }
};

export const createCoupon = async (req: Request, res: Response) => {
    try {
        const coupon = await Coupon.create(req.body);
        res.status(201).json(coupon);
    } catch (error: any) {
        console.error('Create coupon error:', error);
        res.status(500).json({ message: 'Kupon oluşturulamadı.' });
    }
};
