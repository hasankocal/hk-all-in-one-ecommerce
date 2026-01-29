// User
export interface User {
    id: number;
    name: string;
    email: string;
    role: 'customer' | 'admin';
}

// Category
export interface Category {
    id: number;
    name: string;
    seo_url?: string;
    description?: string;
    image_url?: string;
}

// Product
export interface Product {
    id: number;
    name: string;
    seo_url?: string;
    description?: string;
    price: number;
    sale_price?: number;
    stock_quantity?: number;
    images?: string[];
    categoryId?: number;
    // Relations
    category?: Category;
}

// Order & Order Item
export interface OrderItem {
    id: number;
    quantity: number;
    price: number;
    orderId?: number;
    productId?: number;
    // Relations
    product?: Product;
}

export interface Order {
    id: number;
    status: 'pending' | 'preparing' | 'shipped' | 'delivered' | 'cancelled';
    total_amount: number;
    discount_amount?: number;
    coupon_code?: string;
    shipping_address?: Address | any;
    userId?: number;
    createdAt?: Date;
    updatedAt?: Date;
    // Relations
    items?: OrderItem[];
}

// Address
export interface Address {
    id: number;
    title: string;
    full_address: string;
    city: string;
    district: string;
    phone: string;
    is_default: boolean;
    userId?: number;
}

// Coupon
export interface Coupon {
    id: number;
    code: string;
    discountType: 'percent' | 'fixed';
    discountValue: number;
    minOrderAmount: number;
    expirationDate?: Date;
    isActive: boolean;
}

// Content
export interface Slide {
    id: number;
    image: string;
    title: string;
    subtitle?: string;
    buttonText: string;
    link: string;
    order: number;
}

export interface BlogPost {
    id: number;
    title: string;
    excerpt?: string;
    content?: string;
    image?: string;
    publishedAt: Date;
}

export interface Wishlist {
    id: number;
    userId?: number;
    productId?: number;
}
