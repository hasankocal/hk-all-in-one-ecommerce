import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

export default function ChangePassword() {
    const router = useRouter();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChange = () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
            return;
        }
        if (newPassword !== confirmPassword) {
            Alert.alert('Hata', 'Yeni şifreler uyuşmuyor.');
            return;
        }

        // Simulate API call
        Alert.alert('Başarılı', 'Şifreniz başarıyla değiştirildi.', [
            { text: 'Tamam', onPress: () => router.back() }
        ]);
    };

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            <StatusBar style="dark" />
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <View className="flex-row items-center px-4 py-4 border-b border-gray-100">
                <TouchableOpacity onPress={() => router.back()} className="mr-4">
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-gray-900">Şifre Değiştir</Text>
            </View>

            <View className="p-6 space-y-4">
                <View>
                    <Text className="text-gray-700 font-medium mb-2">Mevcut Şifre</Text>
                    <TextInput
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-900"
                        secureTextEntry
                        value={currentPassword}
                        onChangeText={setCurrentPassword}
                    />
                </View>

                <View>
                    <Text className="text-gray-700 font-medium mb-2">Yeni Şifre</Text>
                    <TextInput
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-900"
                        secureTextEntry
                        value={newPassword}
                        onChangeText={setNewPassword}
                    />
                </View>

                <View>
                    <Text className="text-gray-700 font-medium mb-2">Yeni Şifre (Tekrar)</Text>
                    <TextInput
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-900"
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                </View>

                <TouchableOpacity
                    onPress={handleChange}
                    className="w-full bg-blue-600 py-4 rounded-xl items-center shadow-lg shadow-blue-200 mt-4"
                >
                    <Text className="text-white font-bold text-lg">Güncelle</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
