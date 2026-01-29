import { Stack, useRouter, useSegments } from 'expo-router';
import { CartProvider } from '../context/CartContext';
import { WishlistProvider } from '../context/WishlistContext';
import { AuthProvider } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';

export default function Layout() {
    const [isReady, setIsReady] = useState(false);
    const router = useRouter();
    const segments = useSegments();

    useEffect(() => {
        checkOnboarding();
    }, []);

    const checkOnboarding = async () => {
        try {
            const hasLaunched = await AsyncStorage.getItem('hasLaunched');
            if (hasLaunched === null) {
                router.replace('/onboarding');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsReady(true);
        }
    };

    return (
        <AuthProvider>
            <WishlistProvider>
                <CartProvider>
                    <Stack>
                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                        <Stack.Screen name="index" options={{ title: 'Ana Sayfa', headerShown: false }} />
                        <Stack.Screen name="auth" options={{ headerShown: false }} />
                        {/* <Stack.Screen name="shop" options={{ headerShown: false }} /> Removed to fix warning */}
                        {/* <Stack.Screen name="cart" options={{ headerShown: false }} /> Removed to fix warning */}
                        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
                        <Stack.Screen name="cart" options={{ headerShown: false }} />
                        <Stack.Screen name="product" options={{ headerShown: false }} />
                    </Stack>
                </CartProvider>
            </WishlistProvider>
        </AuthProvider>
    );
}
