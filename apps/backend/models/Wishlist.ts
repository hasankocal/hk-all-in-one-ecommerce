import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface WishlistAttributes {
    id: number;
    userId?: number;
    productId?: number;
}

interface WishlistCreationAttributes extends Optional<WishlistAttributes, 'id'> { }

interface WishlistInstance extends Model<WishlistAttributes, WishlistCreationAttributes>, WishlistAttributes { }

const Wishlist = sequelize.define<WishlistInstance>('Wishlist', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
    // Foreign keys userId and productId will be added via associations
});

export = Wishlist;
