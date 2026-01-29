import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { getBlogPosts } from '../../services/api';

export default function BlogList() {
    const router = useRouter();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const data = await getBlogPosts();
            setPosts(data);
        } catch (error) {
            console.error('Error fetching blog posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => router.push(`/blog/${item.id}`)}
            className="bg-white shadow-sm mb-6 overflow-hidden border border-gray-100"
        >
            <Image
                source={{ uri: item.image }}
                className="w-full h-56"
                resizeMode="cover"
            />
            <View className="p-4">
                <View className="flex-row items-center mb-2">
                    <Ionicons name="calendar-outline" size={14} color="#6B8E23" />
                    <Text className="text-xs text-primary font-bold ml-1 uppercase tracking-wide">
                        {new Date(item.publishedAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </Text>
                </View>
                <Text className="text-xl font-bold text-gray-900 mb-2 leading-tight">{item.title}</Text>
                <Text className="text-gray-600 text-sm leading-6 font-light">{item.excerpt}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            <StatusBar style="dark" />
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <View className="flex-row items-center px-4 py-4 bg-white border-b border-gray-100 shadow-sm">
                <TouchableOpacity onPress={() => router.back()} className="mr-4">
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-primary uppercase tracking-wide">Blog</Text>
            </View>

            {loading ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#6B8E23" />
                </View>
            ) : (
                <FlatList
                    data={posts}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={{ padding: 16 }}
                />
            )}
        </SafeAreaView>
    );
}
