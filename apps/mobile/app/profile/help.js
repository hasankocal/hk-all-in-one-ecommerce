import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Help() {
    const router = useRouter();

    const faqs = [
        { q: 'Siparişim ne zaman gelir?', a: 'Siparişleriniz genellikle 1-3 iş günü içinde kargoya verilir.' },
        { q: 'İade politikası nedir?', a: '14 gün içinde koşulsuz iade hakkınız bulunmaktadır.' },
        { q: 'Ödeme seçenekleri nelerdir?', a: 'Kredi kartı ve kapıda ödeme seçeneklerimiz mevcuttur.' },
    ];

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            <StatusBar style="dark" />
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <View className="flex-row items-center px-4 py-4 border-b border-gray-100">
                <TouchableOpacity onPress={() => router.back()} className="mr-4">
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-gray-900">Yardım & Destek</Text>
            </View>

            <ScrollView className="flex-1 p-4">
                <View className="bg-blue-50 p-6 rounded-xl items-center mb-8">
                    <Ionicons name="headset" size={48} color="#2563EB" />
                    <Text className="text-xl font-bold text-blue-900 mt-4">Bizimle İletişime Geçin</Text>
                    <Text className="text-blue-600 text-center mt-2 mb-4">Sorularınız için 7/24 buradayız.</Text>
                    <TouchableOpacity className="bg-blue-600 py-3 px-6 rounded-lg">
                        <Text className="text-white font-bold">Canlı Destek Başlat</Text>
                    </TouchableOpacity>
                </View>

                <Text className="text-lg font-bold text-gray-900 mb-4">Sıkça Sorulan Sorular</Text>
                {faqs.map((faq, index) => (
                    <View key={index} className="bg-gray-50 p-4 rounded-xl mb-3">
                        <Text className="font-bold text-gray-900 mb-2">{faq.q}</Text>
                        <Text className="text-gray-600 leading-5 text-sm">{faq.a}</Text>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}
