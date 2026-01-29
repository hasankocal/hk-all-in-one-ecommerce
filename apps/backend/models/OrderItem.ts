import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface OrderItemAttributes {
    id: number;
    quantity: number;
    price: number;
    orderId?: number;
    productId?: number;
}

interface OrderItemCreationAttributes extends Optional<OrderItemAttributes, 'id' | 'quantity'> { }

interface OrderItemInstance extends Model<OrderItemAttributes, OrderItemCreationAttributes>, OrderItemAttributes { }

const OrderItem = sequelize.define<OrderItemInstance>('OrderItem', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    // product_id and order_id via associations
});

export = OrderItem;
