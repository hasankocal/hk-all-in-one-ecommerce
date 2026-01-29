import { View, Text, Switch, TouchableOpacity } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

export default function Settings() {
    const router = useRouter();
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    return (
        <SafeAreaView className="flex-1 bg-gray-50" edges={['top']}>
            <StatusBar style="dark" />
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <View className="flex-row items-center px-4 py-4 bg-white border-b border-gray-100">
                <TouchableOpacity onPress={() => router.back()} className="mr-4">
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-gray-900">Ayarlar</Text>
            </View>

            <View className="mt-4 bg-white px-4">
                <View className="flex-row justify-between items-center py-4 border-b border-gray-100">
                    <View className="flex-row items-center">
                        <Ionicons name="notifications-outline" size={22} color="gray" />
                        <Text className="text-gray-900 ml-3 text-base">Bildirimler</Text>
                    </View>
                    <Switch value={notifications} onValueChange={setNotifications} />
                </View>

                <View className="flex-row justify-between items-center py-4">
                    <View className="flex-row items-center">
                        <Ionicons name="moon-outline" size={22} color="gray" />
                        <Text className="text-gray-900 ml-3 text-base">Karanlık Mod (Yakında)</Text>
                    </View>
                    <Switch value={darkMode} onValueChange={setDarkMode} disabled />
                </View>
            </View>

            <Text className="px-4 py-2 text-gray-500 text-sm mt-4 uppercase font-bold">Uygulama</Text>
            <View className="bg-white px-4">
                <TouchableOpacity className="flex-row justify-between items-center py-4 border-b border-gray-100">
                    <Text className="text-gray-900">Gizlilik Politikası</Text>
                    <Ionicons name="chevron-forward" size={20} color="gray" />
                </TouchableOpacity>
                <TouchableOpacity className="flex-row justify-between items-center py-4">
                    <Text className="text-gray-900">Kullanım Şartları</Text>
                    <Ionicons name="chevron-forward" size={20} color="gray" />
                </TouchableOpacity>
            </View>

            <Text className="text-center text-gray-400 mt-8 text-xs">Versiyon 1.0.0</Text>
        </SafeAreaView>
    );
}
