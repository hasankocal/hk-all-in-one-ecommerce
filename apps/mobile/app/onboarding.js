import { View, Text, Image, TouchableOpacity, FlatList, Dimensions, StatusBar, Animated, ActivityIndicator } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useRef, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { getSlides } from '../services/api';
import { getProductImage } from '../utils/helpers';

const { width, height } = Dimensions.get('window');

const slides = [
    {
        id: '1',
        title: 'Doğal Lezzetler',
        subtitle: 'SOFRANIZIN YILDIZI',
        description: "Ege'nin bereketli topraklarından sofranıza gelen en saf zeytinyağlarını ve doğal ürünleri keşfedin.",
        image: 'https://images.unsplash.com/photo-1474979266404-7caddbed772e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    },
    {
        id: '2',
        title: 'Soğuk Sıkım',
        subtitle: 'SAĞLIK VE KALİTE',
        description: 'Bedeninize sağlık katan, yüksek polifenollü ve düşük asitli özel üretim soğuk sıkım yağlarımızla tanışın.',
        image: 'https://images.unsplash.com/photo-1542442750-8b776269eb7f?q=80&w=1200&auto=format&fit=crop',
    },
    {
        id: '3',
        title: 'Güvenli Alışveriş',
        subtitle: 'HIZLI TESLİMAT',
        description: 'Doğallıktan ödün vermeden, kapınıza kadar hızlı ve güvenli teslimat garantisiyle.',
        image: 'https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    },
];

const SlideItem = ({ item }) => {
    return (
        <View style={{ width, height }} className="relative bg-black">
            <Image
                source={{ uri: getProductImage(item) }}
                className="absolute inset-0 w-full h-full"
                resizeMode="cover"
            />
            {/* Darker Gradient for better text readability */}
            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)', '#000000']}
                locations={[0, 0.4, 0.7, 1]}
                className="absolute inset-0 w-full h-full"
            />

            <View className="absolute bottom-0 w-full px-8 pb-32 pt-10">
                <View className="items-start space-y-4">
                    <View className="bg-primary/90 px-3 py-1 rounded-sm">
                        <Text className="text-white font-bold tracking-[3px] text-[10px] uppercase">
                            {item.subtitle}
                        </Text>
                    </View>

                    <Text className="text-5xl font-black text-white leading-[1.1] shadow-sm">
                        {item.title}
                    </Text>

                    <Text className="text-gray-300 text-lg leading-7 font-medium max-w-[90%]">
                        {item.description || item.buttonText}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default function Onboarding() {
    const router = useRouter();
    const flatListRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slideData, setSlideData] = useState([]);
    const [loading, setLoading] = useState(true);

    const checkStatus = async () => {
        try {
            const hasLaunched = await AsyncStorage.getItem('hasLaunched');
            if (hasLaunched === 'true') {
                router.replace('/(tabs)/shop');
            }
        } catch (e) {
            console.log(e);
        }
    };

    const fetchSlides = async () => {
        try {
            const data = await getSlides();
            if (data && data.length > 0) {
                setSlideData(data);
            } else {
                setSlideData(slides);
            }
        } catch (error) {
            console.error('Error fetching slides:', error);
            setSlideData(slides);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkStatus();
        fetchSlides();
    }, []);

    const handleFinish = async () => {
        try {
            await AsyncStorage.setItem('hasLaunched', 'true');
            router.replace('/(tabs)/shop');
        } catch (error) {
            console.error('Error saving onboarding status:', error);
            router.replace('/(tabs)/shop');
        }
    };

    const handleNext = () => {
        if (currentIndex < slides.length - 1) {
            flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
        } else {
            handleFinish();
        }
    };

    const handleSkip = () => {
        handleFinish();
    };

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-black">
                <ActivityIndicator size="large" color="#6B8E23" />
            </View>
        );
    }

    return (
        <View className="flex-1 bg-black">
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
            <Stack.Screen options={{ headerShown: false }} />

            <FlatList
                ref={flatListRef}
                data={slideData}
                renderItem={({ item }) => <SlideItem item={item} />}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                bounces={false}
                keyExtractor={(item) => item.id}
                onScroll={e => {
                    const x = e.nativeEvent.contentOffset.x;
                    setCurrentIndex(Math.round(x / width));
                }}
                scrollEventThrottle={16}
            />

            {/* Bottom Controls */}
            <View className="absolute bottom-10 w-full px-8 flex-row items-center justify-between z-10">
                {/* Pagination Dots */}
                <View className="flex-row items-center gap-2">
                    {slideData.map((_, index) => (
                        <View
                            key={index}
                            className={`h-2 rounded-full transition-all duration-300 ${currentIndex === index ? 'w-8 bg-primary shadow-[0_0_10px_rgba(107,142,35,0.5)]' : 'w-2 bg-white/30'
                                }`}
                        />
                    ))}
                </View>

                {/* Animated Next Button */}
                <TouchableOpacity
                    onPress={handleNext}
                    activeOpacity={0.8}
                    className="bg-white px-8 py-3.5 rounded-full flex-row items-center justify-center shadow-lg shadow-black/20"
                >
                    <Text className="text-black font-bold text-sm tracking-widest uppercase mr-2.5">
                        {currentIndex === slideData.length - 1 ? 'Başla' : 'İlerle'}
                    </Text>
                    <View className="bg-black/10 rounded-full p-1">
                        {/* Simple Chevron simulated with text or custom view if Icon not avail */}
                        <View className="w-2 h-2 border-t-2 border-r-2 border-black rotate-45 mr-1" />
                    </View>
                </TouchableOpacity>
            </View>

            {/* Skip Button */}
            {currentIndex < slideData.length - 1 && (
                <TouchableOpacity
                    onPress={handleSkip}
                    className="absolute top-14 right-8 z-20 bg-black/20 px-4 py-2 rounded-full backdrop-blur-md border border-white/10"
                >
                    <Text className="text-white font-semibold text-xs tracking-widest">ATLA</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}
