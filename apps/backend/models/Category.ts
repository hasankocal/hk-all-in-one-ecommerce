import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface CategoryAttributes {
    id: number;
    name: string;
    seo_url?: string;
    description?: string;
    image_url?: string;
}

interface CategoryCreationAttributes extends Optional<CategoryAttributes, 'id' | 'seo_url'> { }

interface CategoryInstance extends Model<CategoryAttributes, CategoryCreationAttributes>, CategoryAttributes { }

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

const Category = sequelize.define<CategoryInstance>('Category', {
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
    image_url: {
        type: DataTypes.STRING,
    },
});

// Auto-generate seo_url before create
Category.beforeCreate(async (category: CategoryInstance) => {
    if (!category.seo_url && category.name) {
        let baseSlug = slugify(category.name);
        let slug = baseSlug;
        let counter = 1;

        // Check for uniqueness
        while (await Category.findOne({ where: { seo_url: slug } })) {
            slug = `${baseSlug}-${counter}`;
            counter++;
        }
        category.seo_url = slug;
    }
});

export = Category;
