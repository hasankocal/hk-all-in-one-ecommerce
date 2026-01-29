import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

export default function Login() {
    const router = useRouter();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
            return;
        }

        setLoading(true);
        try {
            await login(email, password);
            Alert.alert('Başarılı', 'Giriş yapıldı.');
            router.replace('/(tabs)');
        } catch (error) {
            console.log(error);
            Alert.alert('Hata', error.response?.data?.message || 'Giriş yapılamadı.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar style="dark" />
            <View className="flex-1 p-6 justify-center">

                <TouchableOpacity onPress={() => router.back()} className="absolute top-12 left-6 z-10">
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>

                <View className="mb-10">
                    <Text className="text-3xl font-bold text-gray-900 mb-2">Tekrar Hoşgeldiniz!</Text>
                    <Text className="text-gray-500">Devam etmek için giriş yapın.</Text>
                </View>

                <View className="space-y-4">
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

                    <TouchableOpacity className="items-end" onPress={() => router.push('/auth/forgot-password')}>
                        <Text className="text-secondary font-bold text-sm">Şifremi Unuttum?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleLogin}
                        disabled={loading}
                        className={`w-full bg-primary p-4 items-center mt-4 shadow-sm active:bg-primary/90 ${loading ? 'opacity-70' : ''}`}
                    >
                        <Text className="text-white font-bold text-lg uppercase tracking-wider">
                            {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View className="flex-row justify-center mt-8">
                    <Text className="text-gray-600 font-medium">Hesabınız yok mu? </Text>
                    <Link href="/auth/register" asChild>
                        <TouchableOpacity>
                            <Text className="text-secondary font-bold uppercase tracking-wide ml-1">Kayıt Ol</Text>
                        </TouchableOpacity>
                    </Link>
                </View>

            </View>
        </SafeAreaView>
    );
}
