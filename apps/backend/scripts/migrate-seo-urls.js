/**
 * Migration script to generate seo_url for existing products and categories
 * Run with: node scripts/migrate-seo-urls.js
 */

require('dotenv').config();
const { sequelize, Product, Category } = require('../models');

// Turkish character normalization for SEO URLs
const slugify = (text) => {
    const turkishMap = {
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

async function migrateCategories() {
    const categories = await Category.findAll({ where: { seo_url: null } });
    console.log(`Found ${categories.length} categories without seo_url`);

    for (const category of categories) {
        let baseSlug = slugify(category.name);
        let slug = baseSlug;
        let counter = 1;

        // Check for uniqueness
        while (await Category.findOne({ where: { seo_url: slug } })) {
            slug = `${baseSlug}-${counter}`;
            counter++;
        }

        await category.update({ seo_url: slug });
        console.log(`Updated category: ${category.name} -> ${slug}`);
    }
}

async function migrateProducts() {
    const products = await Product.findAll({ where: { seo_url: null } });
    console.log(`Found ${products.length} products without seo_url`);

    for (const product of products) {
        let baseSlug = slugify(product.name);
        let slug = baseSlug;
        let counter = 1;

        // Check for uniqueness
        while (await Product.findOne({ where: { seo_url: slug } })) {
            slug = `${baseSlug}-${counter}`;
            counter++;
        }

        await product.update({ seo_url: slug });
        console.log(`Updated product: ${product.name} -> ${slug}`);
    }
}

async function main() {
    try {
        await sequelize.authenticate();
        console.log('Database connected');

        // Sync to add new columns (force: false to preserve data)
        await sequelize.sync({ alter: true });
        console.log('Schema updated');

        await migrateCategories();
        await migrateProducts();

        console.log('Migration completed!');
        process.exit(0);
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
}

main();
