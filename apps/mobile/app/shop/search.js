import { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { getProducts } from '../../services/api';
import { getProductImage } from '../../utils/helpers';
import { Ionicons } from '@expo/vector-icons';

export default function Search() {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    // Live Search with Debounce
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (query.trim().length > 2) {
                performSearch(query);
            } else {
                setProducts([]);
            }
        }, 500); // Wait 500ms after user stops typing

        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    const performSearch = async (text) => {
        setLoading(true);
        try {
            // Use Backend Search
            const data = await getProducts({ search: text });
            // Backend returns Array if no page param provided (Legacy Mode)
            // Or Object if pagination provided. Here we don't use pagination yet, so expects Array.
            if (Array.isArray(data)) {
                setProducts(data);
            } else if (data.products) {
                setProducts(data.products);
            }
        } catch (error) {
            console.error('Error searching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderProduct = ({ item }) => (
        <TouchableOpacity
            onPress={() => router.push(`/product/${item.id}`)}
            className="flex-row bg-white p-3 border-b border-gray-100 items-center"
        >
            <Image
                source={{ uri: getProductImage(item) }}
                className="w-16 h-16 rounded-md bg-gray-100"
                resizeMode="cover"
            />
            <View className="flex-1 ml-4">
                <Text className="text-gray-900 font-medium" numberOfLines={1}>{item.name}</Text>
                <Text className="text-blue-600 font-bold mt-1">₺{item.price}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="gray" />
        </TouchableOpacity>
    );

    return (
        <View className="flex-1 bg-white">
            <StatusBar style="dark" />
            <Stack.Screen options={{ headerShown: false }} />

            {/* Search Header */}
            <View className="px-4 pt-12 pb-4 bg-white border-b border-gray-200 flex-row items-center space-x-3">
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <View className="flex-1 flex-row items-center bg-gray-100 rounded-xl px-3 h-10">
                    <Ionicons name="search" size={20} color="gray" />
                    <TextInput
                        className="flex-1 ml-2 text-gray-900 h-full"
                        placeholder="Ürün ara..."
                        value={query}
                        onChangeText={setQuery}
                        returnKeyType="search"
                        autoFocus
                    />
                    {query.length > 0 && (
                        <TouchableOpacity onPress={() => setQuery('')}>
                            <Ionicons name="close-circle" size={18} color="gray" />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {loading ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator color="#4F46E5" />
                </View>
            ) : (
                <FlatList
                    data={products}
                    renderItem={renderProduct}
                    keyExtractor={item => item.id.toString()}
                    ListEmptyComponent={
                        query.length > 0 ? (
                            <View className="flex-1 justify-center items-center mt-20">
                                <Text className="text-gray-500">Sonuç bulunamadı.</Text>
                            </View>
                        ) : (
                            <View className="flex-1 justify-center items-center mt-20 px-8">
                                <Text className="text-gray-400 text-center">Aramak istediğiniz ürünün ismini yazın.</Text>
                            </View>
                        )
                    }
                />
            )}
        </View>
    );
}
