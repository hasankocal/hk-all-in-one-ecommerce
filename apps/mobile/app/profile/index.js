import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { useAuth } from '../../context/AuthContext'; // If we had auth context

export default function Profile() {
    const router = useRouter();
    // const { user, logout } = useAuth(); // Mocking for now
    const user = { name: 'Admin', email: 'admin@example.com' };

    const menuItems = [
        { icon: 'pricetag-outline', label: 'Siparişlerim', route: '/profile/orders' },
        { icon: 'heart-outline', label: 'Favorilerim', route: '/wishlist' },
        { icon: 'map-outline', label: 'Adreslerim', route: '/profile/address' },
        { icon: 'newspaper-outline', label: 'Blog', route: '/blog' },
        { icon: 'settings-outline', label: 'Ayarlar', route: '/profile/settings' },
        { icon: 'lock-closed-outline', label: 'Şifre Değiştir', route: '/profile/change-password' },
        { icon: 'help-circle-outline', label: 'Yardım', route: '/profile/help' },
        { icon: 'call-outline', label: 'İletişim', route: '/profile/contact' },
    ];

    const handleLogout = () => {
        router.replace('/auth/login');
    };

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            <StatusBar style="dark" />
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <View className="flex-row justify-between items-center px-6 py-4 border-b border-gray-100 bg-white">
                <Text className="text-2xl font-bold text-primary uppercase tracking-wide">Hesabım</Text>
                <TouchableOpacity onPress={() => router.push('/cart')}>
                    <Ionicons name="cart-outline" size={24} color="#333" />
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1 bg-white">
                {/* User Info */}
                <View className="px-6 py-8 items-center bg-gray-50 mb-6 border-b border-gray-100">
                    <View className="w-24 h-24 bg-white border-2 border-primary rounded-full items-center justify-center mb-4 shadow-sm">
                        <Text className="text-4xl font-bold text-primary">
                            {user.name.charAt(0).toUpperCase()}
                        </Text>
                    </View>
                    <Text className="text-xl font-bold text-gray-900 uppercase tracking-tight">{user.name}</Text>
                    <Text className="text-gray-500 font-medium">{user.email}</Text>
                </View>

                {/* Menu */}
                <View className="px-6">
                    {menuItems.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => item.route && router.push(item.route)}
                            className="flex-row items-center py-5 border-b border-gray-50 active:bg-gray-50"
                        >
                            <View className="w-8 items-center mr-4">
                                <Ionicons name={item.icon} size={22} color="#6B8E23" />
                            </View>
                            <Text className="flex-1 text-gray-800 font-semibold text-base tracking-tight">{item.label}</Text>
                            <Ionicons name="chevron-forward" size={18} color="#D1D5DB" />
                        </TouchableOpacity>
                    ))}

                    <TouchableOpacity
                        onPress={handleLogout}
                        className="flex-row items-center py-5 mt-4"
                    >
                        <View className="w-8 items-center mr-4">
                            <Ionicons name="log-out-outline" size={22} color="#EF4444" />
                        </View>
                        <Text className="flex-1 text-red-600 font-bold text-base tracking-tight">Çıkış Yap</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}
