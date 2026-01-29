import { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { getProducts } from '../../../services/api'; // Adjust path
import { getProductImage } from '../../../utils/helpers';
import { Ionicons } from '@expo/vector-icons';

export default function CategoryProducts() {
    const { id, name } = useLocalSearchParams();
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, [id]);

    const fetchProducts = async () => {
        try {
            // Assuming backend supports filtering by categoryId
            const data = await getProducts({ categoryId: id });
            setProducts(data);
        } catch (error) {
            console.error('Error fetching category products:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderProduct = ({ item }) => (
        <TouchableOpacity
            onPress={() => router.push(`/product/${item.id}`)}
            className="flex-1 m-2 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 max-w-[46%]"
        >
            <View className="h-40 w-full bg-gray-100">
                <Image
                    source={{ uri: getProductImage(item) }}
                    className="w-full h-full"
                    resizeMode="cover"
                />
            </View>
            <View className="p-3">
                <Text className="text-sm font-semibold text-gray-800 mb-1" numberOfLines={1}>
                    {item.name}
                </Text>
                <Text className="text-blue-600 font-bold">
                    ₺{item.price}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View className="flex-1 bg-white">
            <StatusBar style="dark" />
            <Stack.Screen options={{ title: name || 'Kategori', headerBackTitle: 'Geri' }} />

            {loading ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#4F46E5" />
                </View>
            ) : (
                <FlatList
                    data={products}
                    renderItem={renderProduct}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    contentContainerStyle={{ padding: 8 }}
                    ListEmptyComponent={
                        <View className="flex-1 justify-center items-center mt-20">
                            <Text className="text-gray-500">Bu kategoride ürün bulunamadı.</Text>
                        </View>
                    }
                />
            )}
        </View>
    );
}
