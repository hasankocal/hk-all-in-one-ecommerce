import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useWishlist } from '../../context/WishlistContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Wishlist() {
    const router = useRouter();
    const { wishlistItems, toggleWishlist } = useWishlist();

    const renderProduct = ({ item }) => (
        <TouchableOpacity
            onPress={() => router.push(`/product/${item.id}`)}
            className="flex-1 m-2 bg-white shadow-sm overflow-hidden border border-gray-100 max-w-[46%]"
        >
            <View className="h-40 w-full bg-gray-100 relative">
                <Image
                    source={{ uri: item.images?.[0] || 'https://via.placeholder.com/150' }}
                    className="w-full h-full"
                    resizeMode="cover"
                />
                <TouchableOpacity
                    onPress={(e) => {
                        e.preventDefault();
                        toggleWishlist(item);
                    }}
                    className="absolute top-2 right-2 w-8 h-8 bg-white/90 items-center justify-center shadow-sm"
                >
                    <Ionicons name="heart" size={18} color="#EF4444" />
                </TouchableOpacity>
            </View>
            <View className="p-3">
                <Text className="text-sm font-bold text-gray-800 mb-1 leading-tight h-8" numberOfLines={2}>
                    {item.name}
                </Text>
                <Text className="text-secondary font-bold text-lg">
                    ₺{item.price}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            <StatusBar style="dark" />
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <View className="flex-row items-center px-4 py-4 border-b border-gray-100 bg-white">
                <TouchableOpacity onPress={() => router.back()} className="mr-4">
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-primary uppercase tracking-wide">Favorilerim</Text>
            </View>

            <FlatList
                data={wishlistItems}
                renderItem={renderProduct}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                contentContainerStyle={{ padding: 8 }}
                ListEmptyComponent={
                    <View className="flex-1 justify-center items-center mt-20">
                        <Ionicons name="heart-dislike-outline" size={48} color="#E5E7EB" />
                        <Text className="text-gray-500 mt-4 font-medium uppercase tracking-wide">Favori listeniz boş.</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}
