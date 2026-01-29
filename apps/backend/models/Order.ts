import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface OrderAttributes {
    id: number;
    status: 'pending' | 'preparing' | 'shipped' | 'delivered' | 'cancelled';
    total_amount: number;
    discount_amount?: number;
    coupon_code?: string;
    shipping_address?: any; // Define a more specific type if possible
    userId?: number;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, 'id' | 'status' | 'discount_amount' | 'coupon_code' | 'shipping_address'> { }

interface OrderInstance extends Model<OrderAttributes, OrderCreationAttributes>, OrderAttributes { }

const Order = sequelize.define<OrderInstance>('Order', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    status: {
        type: DataTypes.ENUM('pending', 'preparing', 'shipped', 'delivered', 'cancelled'),
        defaultValue: 'pending',
    },
    total_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    discount_amount: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00,
    },
    coupon_code: {
        type: DataTypes.STRING, // e.g., 'SUMMER10'
        allowNull: true,
    },
    shipping_address: {
        type: DataTypes.JSON, // Store address details snapshot
    },
});

export = Order;
