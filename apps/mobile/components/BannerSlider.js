import React from 'react';
import { View, Text, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function BannerSlider({ slides }) {
    if (!slides || slides.length === 0) return null;

    return (
        <View className="mb-8">
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 0 }}
            >
                {slides.map((slide) => (
                    <View key={slide.id} style={{ width: width }} className="h-52 relative">
                        <View className="mx-4 h-full rounded-3xl overflow-hidden bg-gray-900 shadow-xl">
                            <Image
                                source={{ uri: slide.image }}
                                className="w-full h-full opacity-90"
                                resizeMode="cover"
                            />
                            {/* Dark Gradient Overlay equivalent */}
                            <View className="absolute inset-0 bg-black/40" />

                            <View className="absolute inset-0 p-5 justify-end">
                                <View className="mb-1">
                                    <Text className="text-white font-bold text-2xl leading-7 shadow-sm">
                                        {slide.title}
                                    </Text>
                                    <View className="h-1 w-8 bg-secondary mt-2 mb-2 rounded-full" />
                                    <Text className="text-gray-100 font-medium text-sm mb-4 shadow-sm" numberOfLines={2}>
                                        {slide.subtitle}
                                    </Text>
                                </View>

                                <TouchableOpacity className="flex-row items-center bg-white self-start px-4 py-2 rounded-lg shadow-lg active:bg-gray-100">
                                    <Text className="text-primary font-bold text-xs tracking-widest uppercase mr-2">
                                        {slide.buttonText || 'Keşfet'}
                                    </Text>
                                    <Ionicons name="arrow-forward" size={14} color="#6B8E23" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}
