import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from '../constants/Config';
import type {
    Category,
    Product,
    Order,
    Address,
    Slide,
    BlogPost
} from '@olivefe/types';

const api = axios.create({
    baseURL: Config.API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getCategories = async (): Promise<Category[]> => {
    const response = await api.get<Category[]>('/categories');
    return response.data;
};

export const getProducts = async (params = {}): Promise<{ products: Product[], total: number, totalPages: number, currentPage: number }> => {
    const response = await api.get('/products', { params });
    return response.data;
};

export const getProductById = async (id: number | string): Promise<Product> => {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
};

export const login = async (email: string, password: string): Promise<{ token: string, user: any }> => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
};

export const register = async (name: string, email: string, password: string): Promise<{ token: string, user: any }> => {
    const response = await api.post('/auth/register', { name, email, password });
    return response.data;
};

export const createOrder = async (orderData: any): Promise<{ message: string, order: Order }> => {
    const response = await api.post('/orders', orderData);
    return response.data;
};

export const getOrders = async (): Promise<Order[]> => {
    const response = await api.get<Order[]>('/orders');
    return response.data;
};

export const getAddresses = async (): Promise<Address[]> => {
    const response = await api.get<Address[]>('/addresses');
    return response.data;
};

export const addAddress = async (addressData: Partial<Address>): Promise<Address> => {
    const response = await api.post<Address>('/addresses', addressData);
    return response.data;
};

export const deleteAddress = async (id: number | string): Promise<{ message: string }> => {
    const response = await api.delete(`/addresses/${id}`);
    return response.data;
};

export const getWishlist = async (): Promise<Product[]> => {
    const response = await api.get<Product[]>('/wishlist');
    return response.data;
};

export const toggleWishlistApi = async (productId: number): Promise<{ message: string, action: 'added' | 'removed' }> => {
    const response = await api.post('/wishlist/toggle', { productId });
    return response.data;
};

export const getSlides = async (): Promise<Slide[]> => {
    const response = await api.get<Slide[]>('/content/slides');
    return response.data;
};

export const getBlogPosts = async (): Promise<BlogPost[]> => {
    const response = await api.get<BlogPost[]>('/content/blog');
    return response.data;
};

export const getBlogPostById = async (id: number | string): Promise<BlogPost> => {
    const response = await api.get<BlogPost>(`/content/blog/${id}`);
    return response.data;
};

// Coupon
export const validateCoupon = async (code: string, cartTotal: number): Promise<{
    success: boolean;
    code: string;
    discountType: string;
    discountValue: number;
    discountAmount: string;
    message: string;
}> => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await api.post('/coupons/validate', { code, cartTotal }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default api;
