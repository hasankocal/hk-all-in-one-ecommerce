import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface CouponAttributes {
    id: number;
    code: string;
    discountType: 'percent' | 'fixed';
    discountValue: number;
    minOrderAmount: number;
    expirationDate?: Date;
    isActive: boolean;
}

interface CouponCreationAttributes extends Optional<CouponAttributes, 'id' | 'minOrderAmount' | 'isActive'> { }

interface CouponInstance extends Model<CouponAttributes, CouponCreationAttributes>, CouponAttributes { }

const Coupon = sequelize.define<CouponInstance>('Coupon', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    discountType: {
        type: DataTypes.ENUM('percent', 'fixed'),
        defaultValue: 'percent',
        allowNull: false,
    },
    discountValue: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    minOrderAmount: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
    },
    expirationDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
});

export = Coupon;
