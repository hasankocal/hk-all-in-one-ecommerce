import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { getCategories } from '../../services/api';

export default function ShopTab() {
    const router = useRouter();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
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

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            <StatusBar style="dark" />

            {/* Header Title */}
            <View className="px-4 pt-2 pb-4 bg-white">
                <Text className="text-2xl font-bold text-primary tracking-wide">Keşfet</Text>
            </View>

            {/* Dummy Search Bar */}
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => router.push('/shop/search')}
                className="mx-4 mb-6 bg-gray-50 flex-row items-center px-4 py-3 rounded-xl border border-gray-100"
            >
                <Ionicons name="search-outline" size={20} color="#9CA3AF" />
                <Text className="ml-3 text-gray-400 font-medium">Ürün, kategori veya marka ara...</Text>
            </TouchableOpacity>

            <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
                <Text className="text-gray-900 font-bold text-lg mb-4">Kategoriler</Text>

                <View className="pb-8">
                    {categories.map((category) => (
                        <TouchableOpacity
                            key={category.id}
                            onPress={() => router.push({ pathname: `/shop/category/${category.id}`, params: { name: category.name } })}
                            className="flex-row items-center bg-white mb-4 p-2 rounded-2xl border border-gray-50 shadow-sm"
                        >
                            <View className="w-16 h-16 bg-gray-50 rounded-xl overflow-hidden">
                                <Image
                                    source={{ uri: category.image_url }}
                                    className="w-full h-full"
                                    resizeMode="cover"
                                />
                            </View>
                            <View className="flex-1 ml-4 justify-center">
                                <Text className="text-gray-900 font-bold text-base">{category.name}</Text>
                                <Text className="text-gray-400 text-xs mt-0.5">Ürünleri Keşfet</Text>
                            </View>
                            <View className="w-10 h-10 items-center justify-center bg-gray-50 rounded-full">
                                <Ionicons name="arrow-forward" size={20} color="#6B8E23" />
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
