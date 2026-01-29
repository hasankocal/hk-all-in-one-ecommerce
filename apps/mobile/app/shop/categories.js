import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { getCategories } from '../../services/api';

export default function CategoryList() {
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
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <View className="flex-row items-center px-4 py-4 border-b border-gray-100 bg-white">
                <TouchableOpacity onPress={() => router.back()} className="mr-4">
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-primary tracking-wide uppercase">Kategoriler</Text>
            </View>

            <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
                <View className="flex-row flex-wrap justify-between pb-8">
                    {categories.map((category) => (
                        <TouchableOpacity
                            key={category.id}
                            onPress={() => router.push({ pathname: `/shop/category/${category.id}`, params: { name: category.name } })}
                            className="w-[48%] mb-6"
                        >
                            <View className="w-full aspect-square bg-gray-50 shadow-sm mb-3 border border-gray-200 overflow-hidden relative group">
                                <Image
                                    source={{ uri: category.image_url }}
                                    className="w-full h-full"
                                    resizeMode="cover"
                                />
                                <View className="absolute inset-0 bg-black/10" />
                            </View>
                            <Text className="text-center font-bold text-gray-800 uppercase tracking-tight text-sm px-1">
                                {category.name}
                            </Text>
                            <Text className="text-center text-xs text-gray-500 mt-1 px-1" numberOfLines={2}>
                                {category.description}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
