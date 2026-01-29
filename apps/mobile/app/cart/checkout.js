import { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator, Image, TextInput } from 'react-native';
import { useRouter, Stack, useFocusEffect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createOrder, getAddresses, validateCoupon } from '../../services/api';

export default function Checkout() {
    const router = useRouter();
    const { cartItems, total, clearCart } = useCart();
    const { token, isLoading: authLoading } = useAuth();

    const [addresses, setAddresses] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [loadingAddresses, setLoadingAddresses] = useState(true);

    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('credit_card');

    // Coupon State
    const [couponCode, setCouponCode] = useState('');
    const [couponError, setCouponError] = useState('');
    const [discount, setDiscount] = useState(0);
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);

    const handleApplyCoupon = async () => {
        if (!couponCode.trim()) return;
        setIsValidatingCoupon(true);
        setCouponError('');
        try {
            const result = await validateCoupon(couponCode, total);
            setDiscount(parseFloat(result.discountAmount));
            setAppliedCoupon(result.code);
            setCouponCode('');
            Alert.alert('Başarılı', result.message);
        } catch (error) {
            setCouponError(error.response?.data?.message || 'Kupon geçersiz.');
            setDiscount(0);
            setAppliedCoupon(null);
        } finally {
            setIsValidatingCoupon(false);
        }
    };

    const handleRemoveCoupon = () => {
        setDiscount(0);
        setAppliedCoupon(null);
        setCouponCode('');
    };

    const finalTotal = total - discount;

    // Fetch addresses whenever screen comes into focus (in case user added one in profile)
    useFocusEffect(
        useCallback(() => {
            if (token) {
                fetchAddresses();
            } else if (!authLoading) {
                // If not logged in and auth check done, redirect or show alert
                // For now, we will handle it in render, but let's avoid fetching
                setLoadingAddresses(false);
            }
        }, [token, authLoading])
    );

    const fetchAddresses = async () => {
        try {
            setLoadingAddresses(true);
            const data = await getAddresses();
            setAddresses(data);
            // Select first one by default if not selected
            if (data.length > 0 && !selectedAddressId) {
                setSelectedAddressId(data[0].id);
            }
        } catch (error) {
            console.error('Error fetching addresses:', error);
            // If 401, maybe token expired
            if (error.response && error.response.status === 401) {
                // Handle expiration if needed
            }
        } finally {
            setLoadingAddresses(false);
        }
    };

    const handlePlaceOrder = async () => {
        if (!selectedAddressId) {
            Alert.alert('Eksik Bilgi', 'Lütfen teslimat adresi seçin veya yeni ekleyin.');
            return;
        }

        const selectedAddr = addresses.find(a => a.id === selectedAddressId);
        // We construct a string or pass the ID depending on backend expectation.
        // Previously backend expected string 'address'.
        // Let's pass the full formatted string for now to match backend Order model compatibility
        const addressString = `${selectedAddr.title}: ${selectedAddr.full_address}, ${selectedAddr.district}/${selectedAddr.city} (Tel: ${selectedAddr.phone})`;

        setLoading(true);
        try {
            const orderData = {
                items: cartItems.map(item => ({
                    productId: item.id,
                    quantity: item.quantity,
                    price: item.price
                })),
                total_amount: finalTotal,
                coupon_code: appliedCoupon,
                shipping_address: { address: addressString },
                payment_method: paymentMethod
            };

            await createOrder(orderData);

            clearCart();
            router.replace('/cart/thank-you');
            setLoading(false);

        } catch (error) {
            console.error('Order error:', error);
            Alert.alert('Hata', 'Sipariş oluşturulurken bir hata oluştu.');
            setLoading(false);
        }
    };

    if (authLoading) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center bg-white">
                <ActivityIndicator size="large" color="#6B8E23" />
            </SafeAreaView>
        );
    }

    if (!token) {
        return (
            <SafeAreaView className="flex-1 bg-white p-6 justify-center items-center">
                <Ionicons name="lock-closed-outline" size={64} color="#6B8E23" />
                <Text className="text-xl font-bold text-gray-800 mt-4 text-center">Giriş Yapmalısınız</Text>
                <Text className="text-gray-500 text-center mt-2 mb-8">Siparişi tamamlamak için lütfen giriş yapın veya kayıt olun.</Text>

                <TouchableOpacity
                    onPress={() => router.push('/auth/login')}
                    className="bg-primary w-full py-4 rounded-xl items-center shadow-lg"
                >
                    <Text className="text-white font-bold text-lg">Giriş Yap</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => router.back()}
                    className="mt-4 py-4"
                >
                    <Text className="text-gray-500 font-semibold">Geri Dön</Text>
                </TouchableOpacity>
            </SafeAreaView>
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
                <Text className="text-xl font-bold text-primary uppercase">Ödeme Yap</Text>
            </View>

            <ScrollView className="flex-1 p-6 bg-white" showsVerticalScrollIndicator={false}>

                {/* Coupon Section */}
                <View className="mb-8 p-4 bg-gray-50 border border-gray-100 rounded-xl">
                    <Text className="text-lg font-bold text-gray-800 mb-3 uppercase">İndirim Kuponu</Text>

                    {appliedCoupon ? (
                        <View className="flex-row items-center justify-between bg-white p-3 rounded-lg border border-green-200">
                            <View className="flex-row items-center">
                                <Ionicons name="pricetag" size={20} color="#166534" />
                                <View className="ml-3">
                                    <Text className="text-green-800 font-bold">{appliedCoupon}</Text>
                                    <Text className="text-green-600 text-xs">₺{discount.toFixed(2)} indirim uygulandı</Text>
                                </View>
                            </View>
                            <TouchableOpacity onPress={handleRemoveCoupon}>
                                <Ionicons name="close-circle" size={24} color="#EF4444" />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View>
                            <View className="flex-row space-x-2">
                                <TextInput
                                    className="flex-1 bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
                                    placeholder="Kupon Kodunuz"
                                    value={couponCode}
                                    onChangeText={(text) => {
                                        setCouponCode(text);
                                        setCouponError('');
                                    }}
                                    autoCapitalize="characters"
                                    placeholderTextColor="#9CA3AF"
                                />
                                <TouchableOpacity
                                    onPress={handleApplyCoupon}
                                    disabled={!couponCode || isValidatingCoupon}
                                    className={`px-6 justify-center rounded-lg ${!couponCode || isValidatingCoupon ? 'bg-gray-300' : 'bg-primary'}`}
                                >
                                    {isValidatingCoupon ? (
                                        <ActivityIndicator size="small" color="white" />
                                    ) : (
                                        <Text className="text-white font-bold">Uygula</Text>
                                    )}
                                </TouchableOpacity>
                            </View>
                            {couponError ? (
                                <Text className="text-red-500 text-xs mt-2 ml-1 font-medium">{couponError}</Text>
                            ) : null}
                        </View>
                    )}
                </View>

                {/* Order Summary */}
                <View className="mb-8">
                    <Text className="text-lg font-bold text-gray-800 mb-4 uppercase">Sipariş Özeti</Text>
                    <View className="bg-gray-50 p-4 border border-gray-100">
                        {cartItems.map((item) => (
                            <View key={item.id} className="flex-row justify-between mb-3 border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                                <Text className="text-gray-700 flex-1 mr-4 text-sm" numberOfLines={1}>
                                    <Text className="font-bold text-primary">{item.quantity}x</Text> {item.name}
                                </Text>
                                <Text className="font-bold text-gray-900">₺{(item.price * item.quantity).toFixed(2)}</Text>
                            </View>
                        ))}
                        <View className="h-[1px] bg-gray-200 my-3" />

                        {discount > 0 && (
                            <View className="flex-row justify-between items-center mb-2">
                                <Text className="font-medium text-green-600">İndirim</Text>
                                <Text className="font-bold text-green-600">-₺{discount.toFixed(2)}</Text>
                            </View>
                        )}

                        <View className="flex-row justify-between items-center">
                            <Text className="font-bold text-gray-900 text-lg">Toplam Tutar</Text>
                            <Text className="font-bold text-secondary text-xl">₺{finalTotal.toFixed(2)}</Text>
                        </View>
                    </View>
                </View>

                {/* Shipping Address Selection */}
                <View className="mb-8">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-lg font-bold text-gray-800 uppercase">Teslimat Adresi</Text>
                        <TouchableOpacity onPress={() => router.push('/profile/address')}>
                            <Text className="text-secondary font-bold text-sm">+ Yeni Ekle</Text>
                        </TouchableOpacity>
                    </View>

                    {loadingAddresses ? (
                        <ActivityIndicator color="#6B8E23" />
                    ) : addresses.length === 0 ? (
                        <View className="bg-orange-50 p-4 border border-orange-100 rounded-lg">
                            <Text className="text-orange-800 text-sm">Hiç kayıtlı adresiniz yok. Lütfen yeni ekleyin.</Text>
                            <TouchableOpacity onPress={() => router.push('/profile/address')} className="mt-2 bg-orange-200 p-2 rounded items-center">
                                <Text className="font-bold text-orange-900">Adres Ekle</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View>
                            {addresses.map((addr) => (
                                <TouchableOpacity
                                    key={addr.id}
                                    onPress={() => setSelectedAddressId(addr.id)}
                                    className={`mb-3 p-4 border rounded-xl flex-row items-center ${selectedAddressId === addr.id ? 'border-primary bg-primary/5' : 'border-gray-200 bg-white'}`}
                                >
                                    <View className={`w-5 h-5 rounded-full border-2 mr-3 justify-center items-center ${selectedAddressId === addr.id ? 'border-primary' : 'border-gray-300'}`}>
                                        {selectedAddressId === addr.id && <View className="w-2.5 h-2.5 rounded-full bg-primary" />}
                                    </View>
                                    <View className="flex-1">
                                        <View className="flex-row justify-between">
                                            <Text className={`font-bold ${selectedAddressId === addr.id ? 'text-primary' : 'text-gray-800'}`}>{addr.title}</Text>
                                        </View>
                                        <Text className="text-gray-600 text-xs mt-1" numberOfLines={1}>{addr.full_address}</Text>
                                        <Text className="text-gray-400 text-xs">{addr.city} / {addr.district}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>

                {/* Payment Method */}
                <View className="mb-8">
                    <Text className="text-lg font-bold text-gray-800 mb-4 uppercase">Ödeme Yöntemi</Text>
                    <View className="flex-row space-x-4">
                        <TouchableOpacity
                            onPress={() => setPaymentMethod('credit_card')}
                            className={`flex-1 border p-4 items-center justify-center ${paymentMethod === 'credit_card' ? 'bg-primary/5 border-primary' : 'bg-white border-gray-200'}`}
                        >
                            <Ionicons name="card-outline" size={28} color={paymentMethod === 'credit_card' ? '#6B8E23' : '#6B7280'} />
                            <Text className={`font-semibold mt-2 text-sm ${paymentMethod === 'credit_card' ? 'text-primary' : 'text-gray-500'}`}>Kredi Kartı</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setPaymentMethod('cod')}
                            className={`flex-1 border p-4 items-center justify-center ${paymentMethod === 'cod' ? 'bg-primary/5 border-primary' : 'bg-white border-gray-200'}`}
                        >
                            <Ionicons name="cash-outline" size={28} color={paymentMethod === 'cod' ? '#6B8E23' : '#6B7280'} />
                            <Text className={`font-semibold mt-2 text-sm ${paymentMethod === 'cod' ? 'text-primary' : 'text-gray-500'}`}>Kapıda Ödeme</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>

            {/* Footer */}
            <View className="p-6 border-t border-gray-100 bg-white">
                <TouchableOpacity
                    onPress={handlePlaceOrder}
                    disabled={loading || selectedAddressId === null}
                    className={`w-full bg-primary py-4 items-center shadow-md active:bg-primary/90 ${loading || selectedAddressId === null ? 'opacity-50' : ''}`}
                >
                    {loading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text className="text-white font-bold text-lg text-center uppercase">
                            Siparişi Tamamla
                        </Text>
                    )}
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}

