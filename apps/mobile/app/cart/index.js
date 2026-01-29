import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../context/CartContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Cart() {
    const router = useRouter();
    const { cartItems, total, removeFromCart, updateQuantity } = useCart();

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            Alert.alert('Sepet Boş', 'Lütfen sepete ürün ekleyin.');
            return;
        }
        router.push('/cart/checkout');
    };

    if (cartItems.length === 0) {
        return (
            <View className="flex-1 bg-white justify-center items-center p-6">
                <Stack.Screen options={{ headerShown: false }} />
                <View className="w-24 h-24 bg-gray-100 rounded-full items-center justify-center mb-6">
                    <Ionicons name="cart-outline" size={48} color="gray" />
                </View>
                <Text className="text-2xl font-bold text-gray-900 mb-2">Sepetiniz Boş</Text>
                <Text className="text-gray-500 text-center mb-8">Henüz sepetinize ürün eklemediniz. Alışverişe başlamak için ürünleri keşfedin.</Text>
                <TouchableOpacity
                    onPress={() => router.replace('/')}
                    className="bg-primary py-4 px-8 shadow-lg active:bg-primary/90"
                >
                    <Text className="text-white font-bold text-lg uppercase tracking-wide">Alışverişe Başla</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            <StatusBar style="dark" />
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <View className="flex-row justify-between items-center px-4 py-4 border-b border-gray-100 bg-white">
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-gray-900 uppercase tracking-wide">Sepetim ({cartItems.length})</Text>
                <TouchableOpacity onPress={() => { }}>
                    <Ionicons name="trash-outline" size={24} color="transparent" />
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1 px-4 pt-4 bg-white" showsVerticalScrollIndicator={false}>
                {cartItems.map((item) => (
                    <View key={item.id} className="flex-row bg-white p-4 mb-4 border border-gray-100 shadow-sm">
                        <Image
                            source={{ uri: item.images?.[0] || 'https://via.placeholder.com/100' }}
                            className="w-20 h-20 bg-gray-100 border border-gray-200"
                            resizeMode="cover"
                        />
                        <View className="flex-1 ml-4 justify-between">
                            <View>
                                <View className="flex-row justify-between items-start">
                                    <Text className="flex-1 text-sm font-bold text-gray-900 mr-2 leading-tight" numberOfLines={2}>{item.name}</Text>
                                    <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                                        <Ionicons name="close" size={20} color="#999" />
                                    </TouchableOpacity>
                                </View>
                                <Text className="text-primary font-bold mt-1 text-lg">₺{item.price}</Text>
                            </View>

                            <View className="flex-row items-center self-start border border-gray-300 mt-2">
                                <TouchableOpacity
                                    onPress={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="p-1 px-3 bg-gray-50 border-r border-gray-300 hover:bg-gray-100"
                                >
                                    <Text className="text-lg font-bold text-gray-600">-</Text>
                                </TouchableOpacity>
                                <Text className="px-3 font-bold text-gray-900 min-w-[30px] text-center">{item.quantity}</Text>
                                <TouchableOpacity
                                    onPress={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="p-1 px-3 bg-gray-50 border-l border-gray-300 hover:bg-gray-100"
                                >
                                    <Text className="text-lg font-bold text-gray-600">+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>

            {/* Footer */}
            <View className="border-t border-gray-100 p-6 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                <View className="flex-row justify-between items-center mb-6">
                    <Text className="text-gray-500 text-lg font-medium">Toplam Tutar</Text>
                    <Text className="text-2xl font-bold text-secondary">₺{total.toFixed(2)}</Text>
                </View>

                <TouchableOpacity
                    onPress={handleCheckout}
                    className="w-full bg-primary py-4 items-center justify-center active:bg-primary/90"
                >
                    <Text className="text-white font-bold text-lg uppercase tracking-wider">Sepeti Onayla</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
