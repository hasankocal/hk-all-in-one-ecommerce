import sequelize from '../config/database';
import User from './User';
import Product from './Product';
import Category from './Category';
import Order from './Order';
import OrderItem from './OrderItem';
import Address from './Address';
import Slide from './Slide';
import BlogPost from './BlogPost';
import Wishlist from './Wishlist';
import Coupon from './Coupon';

// Associations

// User <-> Address (One-to-Many)
User.hasMany(Address, { foreignKey: 'userId', onDelete: 'CASCADE' });
Address.belongsTo(User, { foreignKey: 'userId' });

// Category <-> Product (One-to-Many)
Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

// User <-> Order (One-to-Many)
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

// Order <-> Product (Many-to-Many via OrderItem)
Order.belongsToMany(Product, { through: OrderItem, foreignKey: 'orderId' });
Product.belongsToMany(Order, { through: OrderItem, foreignKey: 'productId' });

// Also useful to access OrderItems directly
Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

Product.hasMany(OrderItem, { foreignKey: 'productId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });

// User <-> Product (Many-to-Many via Wishlist)
User.belongsToMany(Product, { through: Wishlist, foreignKey: 'userId' });
Product.belongsToMany(User, { through: Wishlist, foreignKey: 'productId' });

// Also useful to access Wishlist directly if needed
User.hasMany(Wishlist, { foreignKey: 'userId' });
Wishlist.belongsTo(User, { foreignKey: 'userId' });
Wishlist.belongsTo(Product, { foreignKey: 'productId' });

export {
    sequelize,
    User,
    Category,
    Product,
    Order,
    OrderItem,
    Address,
    Slide,
    BlogPost,
    Wishlist,
    Coupon,
};
