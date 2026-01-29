import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

export default function ForgotPassword() {
    const router = useRouter();
    const [email, setEmail] = useState('');

    const handleReset = () => {
        if (!email) {
            Alert.alert('Hata', 'Lütfen e-posta adresinizi girin.');
            return;
        }

        // Simulate API call
        Alert.alert('Kontrol Edin', 'E-posta adresinize şifre sıfırlama bağlantısı gönderildi.', [
            { text: 'Tamam', onPress: () => router.back() }
        ]);
    };

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            <StatusBar style="dark" />
            <Stack.Screen options={{ headerShown: false }} />

            <View className="px-6 pt-4">
                <TouchableOpacity onPress={() => router.back()} className="mb-8">
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>

                <Text className="text-3xl font-bold text-gray-900 mb-2">Şifremi Unuttum</Text>
                <Text className="text-gray-500 mb-8 leading-6">
                    E-posta adresinizi girin, size şifrenizi sıfırlamanız için bir bağlantı gönderelim.
                </Text>

                <View>
                    <Text className="text-gray-700 font-medium mb-2">E-posta</Text>
                    <TextInput
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-900 mb-6"
                        placeholder="ornek@email.com"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>

                <TouchableOpacity
                    onPress={handleReset}
                    className="w-full bg-blue-600 py-4 rounded-xl items-center shadow-lg shadow-blue-200"
                >
                    <Text className="text-white font-bold text-lg">Gönder</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
