import { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { getCategories, getProducts, getSlides } from '../../services/api';
import BannerSlider from '../../components/BannerSlider';
import { useRouter } from 'expo-router';
import { getProductImage } from '../../utils/helpers';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Home() {
    const router = useRouter();
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [slides, setSlides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);

    useEffect(() => {
        checkOnboarding();
        fetchInitialData();
    }, []);

    const checkOnboarding = async () => {
        try {
            const hasLaunched = await AsyncStorage.getItem('hasLaunched');
            if (hasLaunched === null) {
                router.replace('/onboarding');
            }
        } catch (error) {
            console.error('Error checking onboarding:', error);
        }
    };

    const fetchInitialData = async () => {
        try {
            const [categoriesData, productsResponse, slidesData] = await Promise.all([
                getCategories(),
                getProducts({ page: 1, limit: 10 }),
                getSlides()
            ]);

            setCategories(categoriesData);

            // Defensive Check: Handle both Array (Legacy) and Object (Pagination) responses
            let initialProducts = [];
            if (Array.isArray(productsResponse)) {
                initialProducts = productsResponse;
            } else if (productsResponse && productsResponse.products) {
                initialProducts = productsResponse.products;
            }

            setProducts(initialProducts);

            // Check hasMore only if it is pagination object
            if (productsResponse && productsResponse.totalPages) {
                setHasMore(productsResponse.currentPage < productsResponse.totalPages);
            } else {
                setHasMore(false); // If array, assume all loaded
            }

            setSlides(slidesData);
            setPage(1);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadMoreProducts = async () => {
        if (loadingMore || !hasMore) return;

        setLoadingMore(true);
        try {
            const nextPage = page + 1;
            const response = await getProducts({ page: nextPage, limit: 10 });

            if (response.products.length > 0) {
                setProducts(prev => {
                    // Unique check using Map to avoid "duplicate key" error
                    const existingIds = new Set(prev.map(p => p.id));
                    const newProducts = response.products.filter(p => !existingIds.has(p.id));
                    return [...prev, ...newProducts];
                });
                setPage(nextPage);
                setHasMore(response.currentPage < response.totalPages);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error loading more products:', error);
        } finally {
            setLoadingMore(false);
        }
    };

    const renderHeader = () => (
        <View className="pb-4">
            {/* Header */}
            <View className="mb-4 flex-row justify-between items-center bg-background-warm p-4 border-b border-primary/5">
                <View>
                    <Text className="text-secondary font-bold text-[10px] tracking-widest uppercase">Aydın'dan Gelen Gelenek</Text>
                    <Text className="text-2xl font-extrabold text-primary mt-0.5">Olivefe</Text>
                </View>
                <View className="flex-row space-x-2">
                    <TouchableOpacity onPress={() => router.push('/shop/search')} className="p-2 mr-1">
                        <Ionicons name="search-outline" size={22} color="#2D3A18" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => router.push('/cart')}
                        className="bg-primary flex-row items-center justify-center w-11 h-11 rounded-2xl shadow-sm"
                    >
                        <Ionicons name="cart-outline" size={22} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Banner Slider */}
            <BannerSlider slides={slides} />

            {/* Categories */}
            <View className="mb-8 px-4">
                <View className="flex-row justify-between items-end mb-6">
                    <View>
                        <Text className="text-secondary font-bold text-[10px] tracking-widest uppercase mb-1">Koleksiyonlar</Text>
                        <Text className="text-2xl font-bold text-primary">Kategoriler</Text>
                    </View>
                    <TouchableOpacity onPress={() => router.push('/shop/categories')} className="bg-primary/5 px-3 py-1.5 rounded-lg">
                        <Text className="text-primary font-bold text-xs">Tümünü Gör</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pb-2">
                    {categories.map((category) => (
                        <TouchableOpacity
                            key={category.id}
                            onPress={() => router.push({ pathname: `/shop/category/${category.id}`, params: { name: category.name } })}
                            className="mr-5 items-center"
                        >
                            <View className="w-20 h-20 bg-white rounded-3xl shadow-sm mb-3 overflow-hidden border border-primary/5">
                                <Image
                                    source={{ uri: category.image_url }}
                                    className="w-full h-full"
                                    resizeMode="cover"
                                />
                            </View>
                            <Text className="text-[11px] font-bold text-primary uppercase tracking-wider">{category.name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Featured Products Title */}
            <View className="px-6 mb-4">
                <Text className="text-secondary font-bold text-[10px] tracking-widest uppercase mb-1">Seçkin Ürünler</Text>
                <Text className="text-2xl font-bold text-primary">Öne Çıkanlar</Text>
            </View>
        </View>
    );

    const renderProduct = ({ item }) => (
        <TouchableOpacity
            onPress={() => router.push(`/product/${item.id}`)}
            className="flex-1 m-2 bg-white rounded-3xl overflow-hidden shadow-sm border border-primary/5 pb-4 max-w-[46%]"
        >
            <View className="h-44 w-full bg-background-warm relative">
                <Image
                    source={{ uri: getProductImage(item) }}
                    className="w-full h-full"
                    resizeMode="cover"
                />
                {item.sale_price && (
                    <View className="absolute top-3 left-3 bg-secondary px-2 py-1 rounded-lg">
                        <Text className="text-primary font-bold text-[10px]">%10 İndirim</Text>
                    </View>
                )}
            </View>
            <View className="p-4">
                <Text className="text-[10px] text-secondary font-bold uppercase tracking-widest mb-1.5" numberOfLines={1}>
                    {categories.find(c => c.id === item.categoryId)?.name || 'Ege Özel'}
                </Text>
                <Text className="text-sm font-bold text-primary mb-3 leading-tight h-10" numberOfLines={2}>
                    {item.name}
                </Text>
                <View className="flex-row items-center flex-wrap mb-4">
                    {item.sale_price ? (
                        <>
                            <Text className="text-gray-400 line-through text-[10px] mr-2">₺{item.price}</Text>
                            <Text className="text-primary font-bold text-lg">₺{item.sale_price}</Text>
                        </>
                    ) : (
                        <Text className="text-primary font-bold text-lg">₺{item.price}</Text>
                    )}
                </View>

                <TouchableOpacity
                    className="w-full bg-primary/5 border border-primary/10 py-2.5 rounded-xl items-center justify-center active:bg-primary"
                    onPress={() => router.push(`/product/${item.id}`)}
                >
                    <Text className="text-primary font-bold text-[10px] uppercase tracking-wider">İncele</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-gray-50">
                <ActivityIndicator size="large" color="#4F46E5" />
            </View>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            <StatusBar style="dark" />
            <FlatList
                data={products}
                renderItem={renderProduct}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                ListHeaderComponent={renderHeader}
                onEndReached={loadMoreProducts}
                onEndReachedThreshold={0.5}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
                columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 16 }}
                ListFooterComponent={
                    loadingMore ? (
                        <View className="py-4 items-center">
                            <ActivityIndicator size="small" color="#6B8E23" />
                        </View>
                    ) : null
                }
            />
        </SafeAreaView>
    );
}
