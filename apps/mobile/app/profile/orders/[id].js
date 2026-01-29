import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import api from '../../../services/api';

export default function OrderDetail() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrderDetail();
    }, [id]);

    const fetchOrderDetail = async () => {
        try {
            const response = await api.get(`/orders/${id}`);
            setOrder(response.data);
        } catch (error) {
            console.error('Error fetching order detail:', error);
        } finally {
            setLoading(false);
        }
    };

    // Timeline Rendering Logic
    const renderTimeline = () => {
        const steps = [
            { key: 'pending', label: 'Sipariş Alındı', icon: 'document-text-outline' },
            { key: 'preparing', label: 'Hazırlanıyor', icon: 'gift-outline' },
            { key: 'shipped', label: 'Kargoda', icon: 'car-outline' },
            { key: 'delivered', label: 'Teslim Edildi', icon: 'checkmark-circle-outline' }
        ];

        if (order.status === 'cancelled') {
            return (
                <View className="bg-red-50 p-4 rounded-xl mb-6 items-center flex-row border border-red-100">
                    <Ionicons name="alert-circle" size={24} color="#EF4444" />
                    <Text className="text-red-600 font-bold ml-2">Bu sipariş iptal edilmiştir.</Text>
                </View>
            );
        }

        const currentStepIndex = steps.findIndex(step => step.key === order.status);
        // If status not found (e.g. unknown), default to -1

        return (
            <View className="bg-white p-4 rounded-xl shadow-sm mb-6 border border-gray-100">
                <Text className="text-lg font-bold text-gray-800 mb-4 uppercase tracking-tight">Sipariş Takibi</Text>
                <View className="ml-2">
                    {steps.map((step, index) => {
                        const isActive = index <= currentStepIndex;
                        const isLast = index === steps.length - 1;

                        return (
                            <View key={step.key} className="flex-row items-start relative pb-6 overflow-visible">
                                {/* Line Connector */}
                                {!isLast && (
                                    <View className={`absolute left-[11px] top-6 w-[2px] h-full ${isActive && index < currentStepIndex ? 'bg-primary' : 'bg-gray-200'}`} />
                                )}

                                {/* Dot/Icon */}
                                <View className={`z-10 w-6 h-6 rounded-full items-center justify-center border-2 ${isActive ? 'bg-primary border-primary' : 'bg-white border-gray-300'}`}>
                                    {isActive && <Ionicons name="checkmark" size={14} color="white" />}
                                </View>

                                {/* Label */}
                                <View className="ml-4 -mt-1">
                                    <Text className={`font-bold text-base ${isActive ? 'text-primary' : 'text-gray-400'}`}>
                                        {step.label}
                                    </Text>
                                    {isActive && index === currentStepIndex && (
                                        <Text className="text-xs text-secondary mt-1">
                                            İşleminiz şu an bu aşamada.
                                        </Text>
                                    )}
                                </View>
                            </View>
                        );
                    })}
                </View>
            </View>
        );
    };

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-white">
                <ActivityIndicator size="large" color="#6B8E23" />
            </View>
        );
    }

    if (!order) {
        return (
            <View className="flex-1 justify-center items-center bg-white">
                <Text>Sipariş bulunamadı.</Text>
            </View>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-gray-50" edges={['top']}>
            <StatusBar style="dark" />
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <View className="flex-row items-center px-4 py-4 bg-white border-b border-gray-100">
                <TouchableOpacity onPress={() => router.back()} className="mr-4">
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-primary">Sipariş #{order.id}</Text>
            </View>

            <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>

                {renderTimeline()}

                {/* Products */}
                <View className="bg-white p-4 rounded-xl border border-gray-100 mb-4">
                    <Text className="text-lg font-bold text-gray-900 mb-4">Ürünler</Text>
                    {order.Products?.map((item, index) => (
                        <View key={index} className="flex-row mb-4 last:mb-0 border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                            <Image
                                source={{ uri: item.images?.[0] || 'https://via.placeholder.com/100' }}
                                className="w-16 h-16 rounded-lg bg-gray-100"
                                resizeMode="cover"
                            />
                            <View className="flex-1 ml-3 justify-center">
                                <Text className="font-semibold text-gray-800" numberOfLines={2}>{item.name}</Text>
                                <Text className="text-gray-500 text-sm mt-1">
                                    {item.OrderItem?.quantity || 1} Adet x ₺{item.OrderItem?.price || item.price}
                                </Text>
                            </View>
                            <View className="justify-center">
                                <Text className="font-bold text-gray-900">
                                    ₺{((item.OrderItem?.quantity || 1) * (item.OrderItem?.price || item.price)).toFixed(2)}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Shipping Address */}
                <View className="bg-white p-4 rounded-xl border border-gray-100 mb-4">
                    <Text className="text-lg font-bold text-gray-900 mb-2">Teslimat Adresi</Text>
                    <View className="flex-row items-start">
                        <Ionicons name="location-outline" size={20} color="#6B7280" style={{ marginTop: 2 }} />
                        <Text className="text-gray-600 leading-5 ml-2 flex-1">
                            {(() => {
                                try {
                                    return typeof order.shipping_address === 'string'
                                        ? (order.shipping_address.startsWith('{') ? JSON.parse(order.shipping_address).address : order.shipping_address)
                                        : order.shipping_address?.address || 'Adres bilgisi yok';
                                } catch (e) {
                                    return 'Adres bilgisi alınamadı';
                                }
                            })()}
                        </Text>
                    </View>
                </View>

                {/* Payment Summary */}
                <View className="bg-white p-4 rounded-xl border border-gray-100 mb-8 pb-6">
                    <Text className="text-lg font-bold text-gray-900 mb-4">Ödeme Özeti</Text>

                    <View className="flex-row justify-between mb-2">
                        <Text className="text-gray-600">Ara Toplam</Text>
                        <Text className="font-medium text-gray-900">
                            ₺{(parseFloat(order.total_amount) + parseFloat(order.discount_amount || 0)).toFixed(2)}
                        </Text>
                    </View>

                    {parseFloat(order.discount_amount) > 0 && (
                        <View className="flex-row justify-between mb-2">
                            <Text className="text-green-600 font-medium">İndirim {order.coupon_code ? `(${order.coupon_code})` : ''}</Text>
                            <Text className="text-green-600 font-bold">-₺{parseFloat(order.discount_amount).toFixed(2)}</Text>
                        </View>
                    )}

                    <View className="flex-row justify-between mb-2">
                        <Text className="text-gray-600">Kargo</Text>
                        <Text className="font-medium text-green-600">Ücretsiz</Text>
                    </View>

                    <View className="h-[1px] bg-gray-100 my-3" />

                    <View className="flex-row justify-between items-center">
                        <Text className="text-lg font-bold text-primary">Toplam</Text>
                        <Text className="text-2xl font-bold text-primary">₺{parseFloat(order.total_amount).toFixed(2)}</Text>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}
