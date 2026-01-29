import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

export default function Register() {
    const router = useRouter();
    const { register } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if (!name || !email || !password) {
            Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
            return;
        }

        setLoading(true);
        try {
            await register(name, email, password);
            Alert.alert('Başarılı', 'Hesabınız oluşturuldu. Lütfen giriş yapın.', [
                { text: 'Tamam', onPress: () => router.replace('/auth/login') }
            ]);
        } catch (error) {
            console.log(error);
            Alert.alert('Hata', error.response?.data?.message || 'Kayıt yapılamadı.');
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
                    <Text className="text-3xl font-bold text-gray-900 mb-2">Hesap Oluştur</Text>
                    <Text className="text-gray-500">Hemen aramıza katılın!</Text>
                </View>

                <View className="space-y-4">
                    <View>
                        <Text className="text-gray-700 font-medium mb-2">Ad Soyad</Text>
                        <TextInput
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-900"
                            placeholder="Adınız Soyadınız"
                            value={name}
                            onChangeText={setName}
                        />
                    </View>

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

                    <TouchableOpacity
                        onPress={handleRegister}
                        disabled={loading}
                        className={`w-full bg-primary p-4 items-center mt-4 shadow-sm active:bg-primary/90 ${loading ? 'opacity-70' : ''}`}
                    >
                        <Text className="text-white font-bold text-lg uppercase tracking-wider">
                            {loading ? 'Kayıt Olunuyor...' : 'Kayıt Ol'}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View className="flex-row justify-center mt-8">
                    <Text className="text-gray-600 font-medium">Zaten hesabınız var mı? </Text>
                    <Link href="/auth/login" asChild>
                        <TouchableOpacity>
                            <Text className="text-secondary font-bold uppercase tracking-wide ml-1">Giriş Yap</Text>
                        </TouchableOpacity>
                    </Link>
                </View>

            </View>
        </SafeAreaView>
    );
}
