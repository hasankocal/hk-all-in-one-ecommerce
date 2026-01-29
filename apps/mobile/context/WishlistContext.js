import React, { createContext, useContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { getWishlist, toggleWishlistApi } from '../services/api';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const { user } = useAuth();
    const [wishlistItems, setWishlistItems] = useState([]);

    useEffect(() => {
        if (user) {
            fetchWishlist();
        } else {
            setWishlistItems([]);
        }
    }, [user]);

    const fetchWishlist = async () => {
        try {
            const data = await getWishlist();
            setWishlistItems(data);
        } catch (error) {
            console.error('Error fetching wishlist:', error);
        }
    };

    const toggleWishlist = async (product) => {
        if (!user) {
            Alert.alert('Giriş Yapın', 'Favorilere eklemek için giriş yapmalısınız.');
            return;
        }

        // Optimistic update
        const exists = wishlistItems.some(item => item.id === product.id);
        if (exists) {
            setWishlistItems(prev => prev.filter(item => item.id !== product.id));
        } else {
            setWishlistItems(prev => [...prev, product]);
        }

        try {
            const result = await toggleWishlistApi(product.id);
            // Optional: Re-fetch or rely on optimistic update
            // if (result.action === 'added') Alert.alert('Eklendi', 'Favorilere eklendi.');
        } catch (error) {
            console.error('Error toggling wishlist:', error);
            // Revert on error
            if (exists) {
                setWishlistItems(prev => [...prev, product]);
            } else {
                setWishlistItems(prev => prev.filter(item => item.id !== product.id));
            }
            Alert.alert('Hata', 'İşlem gerçekleştirilemedi.');
        }
    };

    const isInWishlist = (productId) => {
        return wishlistItems.some(item => item.id === productId);
    };

    return (
        <WishlistContext.Provider value={{
            wishlistItems,
            toggleWishlist,
            isInWishlist
        }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);
