import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

export default function Contact() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (!name || !email || !message) {
            Alert.alert('Eksik Bilgi', 'Lütfen tüm alanları doldurun.');
            return;
        }

        // Simulate API call
        Alert.alert('Mesajınız Alındı', 'En kısa sürede size dönüş yapacağız.', [
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
                <Text className="text-xl font-bold text-gray-900">İletişim</Text>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <ScrollView className="flex-1 p-6">
                    <Text className="text-2xl font-bold text-gray-900 mb-2">Bize Ulaşın</Text>
                    <Text className="text-gray-500 mb-8">Görüş ve önerileriniz bizim için değerli.</Text>

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
                            />
                        </View>

                        <View>
                            <Text className="text-gray-700 font-medium mb-2">Mesajınız</Text>
                            <TextInput
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-900 h-32"
                                placeholder="Mesajınızı buraya yazın..."
                                multiline
                                textAlignVertical="top"
                                value={message}
                                onChangeText={setMessage}
                            />
                        </View>

                        <TouchableOpacity
                            onPress={handleSend}
                            className="w-full bg-blue-600 py-4 rounded-xl items-center shadow-lg shadow-blue-200 mt-4"
                        >
                            <Text className="text-white font-bold text-lg">Gönder</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
