import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface BlogPostAttributes {
    id: number;
    title: string;
    excerpt?: string;
    content?: string;
    image?: string;
    publishedAt: Date;
}

interface BlogPostCreationAttributes extends Optional<BlogPostAttributes, 'id' | 'excerpt' | 'content' | 'image' | 'publishedAt'> { }

interface BlogPostInstance extends Model<BlogPostAttributes, BlogPostCreationAttributes>, BlogPostAttributes { }

const BlogPost = sequelize.define<BlogPostInstance>('BlogPost', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    excerpt: {
        type: DataTypes.TEXT,
    },
    content: {
        type: DataTypes.TEXT('long'), // For full HTML/Markdown content
    },
    image: {
        type: DataTypes.STRING,
    },
    publishedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
});

export = BlogPost;
