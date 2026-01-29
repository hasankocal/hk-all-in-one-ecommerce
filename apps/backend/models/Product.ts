import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface ProductAttributes {
    id: number;
    name: string;
    seo_url?: string;
    description?: string;
    price: number;
    sale_price?: number;
    stock_quantity?: number;
    images?: string[];
    categoryId?: number;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, 'id' | 'seo_url' | 'stock_quantity' | 'images'> { }

interface ProductInstance extends Model<ProductAttributes, ProductCreationAttributes>, ProductAttributes { }

// Turkish character normalization for SEO URLs
const slugify = (text: string): string => {
    const turkishMap: { [key: string]: string } = {
        'ç': 'c', 'Ç': 'C', 'ğ': 'g', 'Ğ': 'G', 'ı': 'i', 'I': 'i',
        'İ': 'i', 'ö': 'o', 'Ö': 'O', 'ş': 's', 'Ş': 'S', 'ü': 'u', 'Ü': 'U'
    };
    return text
        .split('')
        .map(char => turkishMap[char] || char)
        .join('')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
};

const Product = sequelize.define<ProductInstance>('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    seo_url: {
        type: DataTypes.STRING,
        unique: true,
    },
    description: {
        type: DataTypes.TEXT,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    sale_price: {
        type: DataTypes.DECIMAL(10, 2),
    },
    stock_quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    images: {
        type: DataTypes.JSON, // Storing image URLs as JSON array
        defaultValue: [],
    },
    // Foreign Key for Category will be added in associations
});

// Auto-generate seo_url before create
Product.beforeCreate(async (product: ProductInstance) => {
    if (!product.seo_url && product.name) {
        let baseSlug = slugify(product.name);
        let slug = baseSlug;
        let counter = 1;

        // Check for uniqueness
        while (await Product.findOne({ where: { seo_url: slug } })) {
            slug = `${baseSlug}-${counter}`;
            counter++;
        }
        product.seo_url = slug;
    }
});

export = Product;

