import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface SlideAttributes {
    id: number;
    image: string;
    title: string;
    subtitle?: string;
    buttonText: string;
    link: string;
    order: number;
}

interface SlideCreationAttributes extends Optional<SlideAttributes, 'id' | 'subtitle' | 'buttonText' | 'link' | 'order'> { }

interface SlideInstance extends Model<SlideAttributes, SlideCreationAttributes>, SlideAttributes { }

const Slide = sequelize.define<SlideInstance>('Slide', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    subtitle: {
        type: DataTypes.STRING,
    },
    buttonText: {
        type: DataTypes.STRING,
        defaultValue: 'Keşfet',
    },
    link: {
        type: DataTypes.STRING, // e.g., "/shop/category/1"
        defaultValue: '/shop',
    },
    order: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    }
});

export = Slide;
