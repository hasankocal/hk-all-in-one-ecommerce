import { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { getOrders } from '../../../services/api';

export default function Orders() {
    const router = useRouter();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const data = await getOrders();
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderOrder = ({ item }) => (
        <TouchableOpacity
            onPress={() => router.push(`/profile/orders/${item.id}`)}
            className="bg-white p-4 rounded-xl border border-gray-100 mb-4 shadow-sm"
        >
            <View className="flex-row justify-between items-center mb-2">
                <Text className="font-bold text-gray-900">Sipariş NO: #{item.id}</Text>
                <Text className={`text-xs font-bold px-2 py-1 rounded-full ${item.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                    }`}>
                    {item.status.toUpperCase()}
                </Text>
            </View>
            <Text className="text-gray-500 text-sm mb-2">
                {new Date(item.createdAt).toLocaleDateString('tr-TR')}
            </Text>
            <View className="flex-row justify-between items-end">
                <Text className="text-gray-600 text-sm">
                    {item.Products?.length || 0} Ürün
                </Text>
                <Text className="text-blue-600 font-bold text-lg">₺{item.total_amount}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View className="flex-1 bg-gray-50">
            <StatusBar style="dark" />
            <Stack.Screen options={{ title: 'Siparişlerim', headerBackTitle: 'Geri' }} />

            {loading ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator color="#4F46E5" />
                </View>
            ) : (
                <FlatList
                    data={orders}
                    renderItem={renderOrder}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={{ padding: 16 }}
                    ListEmptyComponent={
                        <View className="flex-1 justify-center items-center mt-20">
                            <Text className="text-gray-500">Henüz hiç siparişiniz yok.</Text>
                        </View>
                    }
                />
            )}
        </View>
    );
}
