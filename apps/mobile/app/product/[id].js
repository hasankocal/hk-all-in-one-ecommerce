import { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getProductById } from '../../services/api';
import { getProductImage } from '../../utils/helpers';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../context/CartContext';

import { useWishlist } from '../../context/WishlistContext';

export default function ProductDetail() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const data = await getProductById(id);
            setProduct(data);
        } catch (error) {
            console.error('Error fetching product:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-white">
                <ActivityIndicator size="large" color="#6B8E23" />
            </View>
        );
    }

    if (!product) {
        return (
            <View className="flex-1 justify-center items-center bg-white">
                <Text>Ürün bulunamadı.</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-white">
            <StatusBar style="dark" />
            <Stack.Screen options={{ headerShown: false }} />

            <ScrollView className="flex-1 bg-white" showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View className="absolute top-0 left-0 right-0 z-10 flex-row justify-between items-center px-4 pt-12">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="w-10 h-10 bg-white/90 items-center justify-center shadow-sm border border-gray-100"
                    >
                        <Ionicons name="arrow-back" size={24} color="#333" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => product && toggleWishlist(product)}
                        className="w-10 h-10 bg-white/90 items-center justify-center shadow-sm border border-gray-100"
                    >
                        <Ionicons
                            name={product && isInWishlist(product.id) ? "heart" : "heart-outline"}
                            size={24}
                            color={product && isInWishlist(product.id) ? "#EF4444" : "#333"}
                        />
                    </TouchableOpacity>
                </View>

                {/* Image */}
                <View className="h-[500px] w-full bg-gray-50 relative">
                    <Image
                        source={{ uri: getProductImage(product) }}
                        className="w-full h-full"
                        resizeMode="cover"
                    />
                    <View className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/5 to-transparent" />
                </View>

                {/* Content */}
                <View className="flex-1 bg-white px-6 pt-6 pb-32">
                    <View className="flex-row justify-between items-start mb-2">
                        <View className="flex-1 mr-4">
                            {product.Category && (
                                <Text className="text-sm font-bold text-primary uppercase tracking-wider mb-1">{product.Category.name}</Text>
                            )}
                            <Text className="text-2xl font-bold text-gray-900 leading-tight">{product.name}</Text>
                        </View>
                    </View>

                    <View className="flex-row items-end mb-6 py-2 border-b border-gray-100">
                        {product.sale_price ? (
                            <View>
                                <Text className="text-gray-400 line-through text-lg mr-2">₺{product.price}</Text>
                                <Text className="text-3xl font-bold text-secondary">₺{product.sale_price}</Text>
                            </View>
                        ) : (
                            <Text className="text-3xl font-bold text-secondary">₺{product.price}</Text>
                        )}
                        {product.sale_price && (
                            <View className="ml-4 bg-red-50 px-2 py-1 border border-red-100">
                                <Text className="text-red-500 font-bold text-xs">İNDİRİM</Text>
                            </View>
                        )}
                    </View>

                    <Text className="text-lg font-bold text-gray-900 mb-3">Ürün Açıklaması</Text>
                    <Text className="text-gray-600 leading-7 text-base mb-6 font-light">
                        {product.description || 'Bu ürün için açıklama bulunmuyor.'}
                    </Text>

                    {/* Additional Info / Tabs could go here */}
                    <View className="flex-row space-x-8 py-4 border-t border-gray-100">
                        <View>
                            <Text className="text-gray-400 text-xs uppercase tracking-wider font-bold">Kargo</Text>
                            <Text className="text-gray-800 font-medium mt-1">24 Saatte Kargoda</Text>
                        </View>
                        <View>
                            <Text className="text-gray-400 text-xs uppercase tracking-wider font-bold">Garanti</Text>
                            <Text className="text-gray-800 font-medium mt-1">%100 İade Garantisi</Text>
                        </View>
                    </View>

                </View>
            </ScrollView>

            {/* Bottom Action Bar */}
            <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-8 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                <View className="flex-row items-center space-x-4">
                    {/* Quantity Selector could be here */}

                    <TouchableOpacity
                        onPress={() => addToCart(product)}
                        className="flex-1 bg-primary py-4 items-center justify-center active:bg-primary/90"
                    >
                        <Text className="text-white font-bold text-lg uppercase tracking-wide">Sepete Ekle</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
