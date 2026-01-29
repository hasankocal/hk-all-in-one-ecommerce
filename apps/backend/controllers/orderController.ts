import { Request, Response } from 'express';
import { Op, Transaction } from 'sequelize';
import sequelize from '../config/database';
import Order from '../models/Order';
import OrderItem from '../models/OrderItem';
import Product from '../models/Product';
import Coupon from '../models/Coupon';

export const createOrder = async (req: Request, res: Response) => {
    const t = await sequelize.transaction();

    try {
        const { items, total_amount, shipping_address, payment_method, coupon_code } = req.body;
        const userId = req.user!.id; // User is guaranteed by middleware

        // 0. Backend Validation for Total and Coupon
        let calculatedTotal = 0;
        let discountAmount = 0;

        // Verify Items and Calculate Base Total
        for (const item of items) {
            const product = await Product.findByPk(item.productId, { transaction: t });
            if (!product) {
                await t.rollback();
                return res.status(404).json({ message: `Product not found: ID ${item.productId}` });
            }
            if ((product.stock_quantity || 0) < item.quantity) {
                await t.rollback();
                return res.status(400).json({ message: `Stok yetersiz: ${product.name}` });
            }
            calculatedTotal += Number(product.price) * item.quantity;
        }

        // Verify Coupon if provided
        if (coupon_code) {
            const coupon = await Coupon.findOne({
                where: {
                    code: coupon_code,
                    isActive: true,
                    expirationDate: { [Op.or]: [{ [Op.gt]: new Date() }, null] } as any
                },
                transaction: t
            });

            if (coupon) {
                if (calculatedTotal >= Number(coupon.minOrderAmount)) {
                    if (coupon.discountType === 'percent') {
                        discountAmount = (calculatedTotal * Number(coupon.discountValue)) / 100;
                    } else {
                        discountAmount = Number(coupon.discountValue);
                    }
                    if (discountAmount > calculatedTotal) discountAmount = calculatedTotal;
                }
            }
        }

        const finalTotal = calculatedTotal - discountAmount;
        // Optional: Compare finalTotal with req.body.total_amount for consistency check

        // 2. Create Order
        const order = await Order.create({
            userId,
            total_amount: finalTotal,
            discount_amount: discountAmount,
            coupon_code: coupon_code,
            status: 'pending',
            shipping_address: typeof shipping_address === 'string' ? shipping_address : shipping_address, // JSON handling in model
        }, { transaction: t });

        // 3. Create OrderItems & Update Stock
        for (const item of items) {
            await OrderItem.create({
                orderId: order.id,
                productId: item.productId,
                quantity: item.quantity,
                price: item.price
            }, { transaction: t });

            const product = await Product.findByPk(item.productId, { transaction: t });
            if (product) {
                product.stock_quantity = (product.stock_quantity || 0) - item.quantity;
                await product.save({ transaction: t });
            }
        }

        await t.commit();
        res.status(201).json({ message: 'Order created successfully', order });

    } catch (error: any) {
        await t.rollback();
        console.error(error);
        res.status(500).json({ message: 'Error creating order', error: error.message });
    }
};

export const getOrders = async (req: Request, res: Response) => {
    try {
        const userId = req.user ? req.user.id : 1; // Fallback
        const orders = await Order.findAll({
            where: { userId },
            include: [
                {
                    model: Product,
                    through: { attributes: ['quantity', 'price'] }
                }
            ],
            order: [['createdAt', 'DESC']]
        });
        res.json(orders);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching orders', error });
    }
};

export const getOrderById = async (req: Request, res: Response) => {
    try {
        const order = await Order.findByPk(Number(req.params.id), {
            include: [
                {
                    model: Product,
                    through: { attributes: ['quantity', 'price'] }
                }
            ]
        });
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching order', error });
    }
};

export const trackOrder = async (req: Request, res: Response) => {
    try {
        const { orderId } = req.params;
        const { email } = req.query;

        // Find order with products
        const order = await Order.findByPk(Number(orderId), {
            include: [
                {
                    model: Product,
                    through: { attributes: ['quantity', 'price'] }
                }
            ]
        });

        if (!order) {
            return res.status(404).json({ message: 'Sipariş bulunamadı.' });
        }

        // Check types for timeline logic
        const orderJson = order.toJSON() as any;

        const timeline = [
            { status: 'Sipariş Alındı', date: (order as any).createdAt, completed: true },
            { status: 'Hazırlanıyor', date: order.status !== 'pending' ? (order as any).updatedAt : null, completed: ['preparing', 'shipped', 'delivered'].includes(order.status) },
            { status: 'Kargoya Verildi', date: null, completed: ['shipped', 'delivered'].includes(order.status) },
            { status: 'Teslim Edildi', date: null, completed: order.status === 'delivered' }
        ];

        orderJson.timeline = timeline;

        // Format for frontend
        const statusMap: Record<string, string> = {
            'pending': 'Sipariş Alındı',
            'preparing': 'Hazırlanıyor',
            'shipped': 'Kargoya Verildi',
            'delivered': 'Teslim Edildi',
            'cancelled': 'İptal Edildi'
        };

        orderJson.statusText = statusMap[order.status] || order.status;

        res.json(orderJson);
    } catch (error: any) {
        console.error('Track Order Error:', error);
        res.status(500).json({ message: 'Sipariş sorgulanırken bir hata oluştu.', error: error.message });
    }
};
