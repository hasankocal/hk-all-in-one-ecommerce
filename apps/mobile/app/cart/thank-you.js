import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function ThankYou() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-white items-center justify-center p-6">
            <StatusBar style="dark" />
            <Stack.Screen options={{ headerShown: false, gestureEnabled: false }} />

            <View className="w-32 h-32 bg-primary/10 items-center justify-center mb-8 border border-primary/20">
                <Ionicons name="checkmark-circle" size={80} color="#6B8E23" />
            </View>

            <Text className="text-3xl font-bold text-primary mb-4 text-center uppercase tracking-wide">Siparişiniz Alındı!</Text>
            <Text className="text-gray-600 text-center text-lg mb-12 px-4 leading-relaxed">
                Siparişiniz başarıyla oluşturuldu. Doğal lezzetleriniz en kısa sürede hazırlanıp kargoya verilecektir.
            </Text>

            <TouchableOpacity
                onPress={() => router.replace('/(tabs)')}
                className="w-full bg-primary py-4 items-center shadow-md active:bg-primary/90 mb-4"
            >
                <Text className="text-white font-bold text-lg uppercase tracking-wider">Alışverişe Devam Et</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    // Navigate to home first, then to orders tab if possible, or just orders page
                    // Since orders is inside Profile tab usually, we can redirect to Profile
                    router.replace('/(tabs)/profile');
                }}
                className="w-full py-4 items-center border border-gray-200 active:bg-gray-50"
            >
                <Text className="text-gray-500 font-semibold text-base uppercase tracking-wide">Siparişimi Görüntüle</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
