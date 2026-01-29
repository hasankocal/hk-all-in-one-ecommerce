import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface AddressAttributes {
    id: number;
    title: string;
    full_address: string;
    city: string;
    district: string;
    phone: string;
    is_default: boolean;
    userId?: number;
}

interface AddressCreationAttributes extends Optional<AddressAttributes, 'id' | 'is_default'> { }

interface AddressInstance extends Model<AddressAttributes, AddressCreationAttributes>, AddressAttributes { }

const Address = sequelize.define<AddressInstance>('Address', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false, // e.g., "Evim", "İş Yeri"
    },
    full_address: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    district: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // Optional: Is this the default address?
    is_default: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
});

export = Address;
