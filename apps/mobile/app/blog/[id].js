import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BlogDetail() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    // Mock fetching logic
    const post = {
        id: id,
        title: 'Yaz Modası Trendleri',
        content: `Yaz ayları geldiğinde gardıroplarımızı yenileme zamanı da gelmiş demektir. Bu sezon canlı renkler, hafif kumaşlar ve cesur desenler ön planda.

        1. Canlı Renkler
        Bu yaz, neon renkler ve pastel tonlar bir arada kullanılıyor. Turuncu, pembe ve yeşilin en canlı tonlarını sokaklarda sıkça göreceğiz.

        2. Desenler
        Çiçek desenleri her zamanki gibi popülerliğini koruyor ancak bu yıl daha büyük ve soyut çiçek motifleri dikkat çekiyor.

        3. Kumaşlar
        Sıcak havalarda rahat etmenizi sağlayacak keten ve pamuklu kumaşlar tercih etmelisiniz. Sürdürülebilir moda akımıyla birlikte organik kumaşlar da oldukça revaçta.`,
        image: 'https://via.placeholder.com/400x200',
        date: '12 Haz 2026',
        author: 'Moda Editörü'
    };

    return (
        <View className="flex-1 bg-white">
            <StatusBar style="dark" />
            <Stack.Screen options={{ headerShown: false }} />

            <ScrollView className="flex-1">
                {/* Header Image & Nav */}
                <View className="relative h-64">
                    <Image
                        source={{ uri: post.image }}
                        className="w-full h-full"
                        resizeMode="cover"
                    />
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="absolute top-12 left-4 w-10 h-10 bg-white/80 rounded-full items-center justify-center"
                    >
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                </View>

                <View className="p-6">
                    <View className="flex-row justify-between items-center mb-4">
                        <View className="flex-row items-center bg-blue-50 px-3 py-1 rounded-full">
                            <Ionicons name="calendar-outline" size={14} color="#2563EB" />
                            <Text className="text-xs text-blue-700 ml-1 font-medium">{post.date}</Text>
                        </View>
                        <Text className="text-gray-500 text-sm">{post.author}</Text>
                    </View>

                    <Text className="text-2xl font-bold text-gray-900 mb-6">{post.title}</Text>

                    <Text className="text-gray-700 leading-7 text-base">
                        {post.content}
                    </Text>
                </View>

            </ScrollView>
        </View>
    );
}
