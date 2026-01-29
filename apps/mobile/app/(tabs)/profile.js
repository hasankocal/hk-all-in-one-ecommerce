import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert, Image } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';

export default function Profile() {
    const router = useRouter();
    const { user, logout, login, register } = useAuth();

    // Auth States
    const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
            return;
        }
        setLoading(true);
        try {
            await login(email, password);
            // Alert.alert('Başarılı', 'Giriş yapıldı.'); 
            // Otomatik olarak user gelecek ve ekran değişecek
        } catch (error) {
            Alert.alert('Hata', error.response?.data?.message || 'Giriş yapılamadı.');
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async () => {
        if (!name || !email || !password) {
            Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
            return;
        }
        setLoading(true);
        try {
            await register(name, email, password);
            Alert.alert('Başarılı', 'Hesabınız oluşturuldu. Lütfen giriş yapın.', [
                { text: 'Tamam', onPress: () => setAuthMode('login') }
            ]);
        } catch (error) {
            Alert.alert('Hata', error.response?.data?.message || 'Kayıt yapılamadı.');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await logout();
        // router.replace('/auth/login'); // Artık gerek yok, state değişecek ve form gelecek
    };

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

    if (!user) {
        return (
            <SafeAreaView className="flex-1 bg-white" edges={['top']}>
                <StatusBar style="dark" />
                <Stack.Screen options={{ headerShown: false }} />

                <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}>
                    <View className="items-center mb-10">
                        {/* Logo or Icon placeholder */}
                        <View className="w-20 h-20 bg-primary/10 rounded-full items-center justify-center mb-4">
                            <Ionicons name="person-outline" size={40} color="#6B8E23" />
                        </View>
                        <Text className="text-3xl font-bold text-gray-900 mb-2">
                            {authMode === 'login' ? 'Giriş Yap' : 'Kayıt Ol'}
                        </Text>
                        <Text className="text-gray-500 text-center">
                            {authMode === 'login'
                                ? 'Siparişlerinizi takip etmek için giriş yapın.'
                                : 'Ayrıcalıklardan yararlanmak için hesap oluşturun.'}
                        </Text>
                    </View>

                    <View className="space-y-4">
                        {authMode === 'register' && (
                            <View>
                                <Text className="text-gray-700 font-medium mb-2">Ad Soyad</Text>
                                <TextInput
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-900"
                                    placeholder="Adınız Soyadınız"
                                    value={name}
                                    onChangeText={setName}
                                />
                            </View>
                        )}

                        <View>
                            <Text className="text-gray-700 font-medium mb-2">Email</Text>
                            <TextInput
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-900"
                                placeholder="ornek@email.com"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        <View>
                            <Text className="text-gray-700 font-medium mb-2">Şifre</Text>
                            <TextInput
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-900"
                                placeholder="••••••"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />
                        </View>

                        {authMode === 'login' && (
                            <TouchableOpacity className="items-end">
                                <Text className="text-secondary font-bold text-sm">Şifremi Unuttum?</Text>
                            </TouchableOpacity>
                        )}

                        <TouchableOpacity
                            onPress={authMode === 'login' ? handleLogin : handleRegister}
                            disabled={loading}
                            className={`w-full bg-primary p-4 items-center mt-4 shadow-sm active:bg-primary/90 ${loading ? 'opacity-70' : ''}`}
                        >
                            <Text className="text-white font-bold text-lg uppercase tracking-wider">
                                {loading ? 'İşlem Yapılıyor...' : (authMode === 'login' ? 'Giriş Yap' : 'Kayıt Ol')}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View className="flex-row justify-center mt-8">
                        <Text className="text-gray-600 font-medium">
                            {authMode === 'login' ? 'Hesabınız yok mu?' : 'Zaten hesabınız var mı?'}
                        </Text>
                        <TouchableOpacity onPress={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}>
                            <Text className="text-secondary font-bold uppercase tracking-wide ml-1">
                                {authMode === 'login' ? 'Kayıt Ol' : 'Giriş Yap'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }

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
                            {user?.name ? user.name.charAt(0).toUpperCase() : '?'}
                        </Text>
                    </View>
                    <Text className="text-xl font-bold text-gray-900 uppercase tracking-tight">{user?.name}</Text>
                    <Text className="text-gray-500 font-medium">{user?.email}</Text>
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
