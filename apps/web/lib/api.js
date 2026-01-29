import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add auth interceptor
api.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

export const getProducts = async (params = {}) => {
    try {
        const response = await api.get('/products', { params });
        // Handle both paginated ({ products: [...], total: ... }) and simple array ([...]) responses
        if (response.data.products) {
            return response.data;
        }
        return { products: response.data, total: response.data.length };
    } catch (error) {
        console.error("API Error (getProducts):", error);
        return { products: [], total: 0 };
    }
};

export const getProduct = async (id) => {
    try {
        const response = await api.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.error("API Error (getProduct):", error);
        return null;
    }
};

export const getCategories = async () => {
    try {
        const response = await api.get('/categories');
        return response.data;
    } catch (error) {
        console.error("API Error (getCategories):", error);
        return [];
    }
};

export const getProductsByCategory = async (seoUrl) => {
    try {
        const response = await api.get(`/categories/${seoUrl}/products`);
        return response.data;
    } catch (error) {
        console.error("API Error (getProductsByCategory):", error);
        return { category: null, products: [] };
    }
};

export const login = async (email, password) => {
    try {
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    } catch (error) {
        console.error("API Error (login):", error.response?.data || error.message);
        throw error.response?.data || { error: "Login failed" };
    }
};

export const register = async (name, email, password) => {
    try {
        const response = await api.post('/auth/register', { name, email, password });
        return response.data;
    } catch (error) {
        console.error("API Error (register):", error.response?.data || error.message);
        throw error.response?.data || { error: "Registration failed" };
    }
};

export const createOrder = async (orderData) => {
    try {
        const response = await api.post('/orders', orderData);
        return response.data;
    } catch (error) {
        console.error("API Error (createOrder):", error.response?.data || error.message);
        throw error.response?.data || { error: "Order creation failed" };
    }
};

export const getOrders = async () => {
    try {
        const response = await api.get('/orders');
        return response.data;
    } catch (error) {
        console.error("API Error (getOrders):", error.response?.data || error.message);
        // Return empty array on error to prevent crash
        return [];
    }
};

export const trackOrder = async (orderId, email) => {
    try {
        const response = await api.get(`/orders/track/${orderId}`, {
            params: { email }
        });
        return response.data;
    } catch (error) {
        console.error("API Error (trackOrder):", error.response?.data || error.message);
        throw error.response?.data || { message: "Sipariş bulunamadı" };
    }
};

export default api;
