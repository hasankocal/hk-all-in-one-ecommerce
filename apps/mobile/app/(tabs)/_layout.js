import { Tabs, useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

function TabBarIcon({ name, color, focused, isDot }) {
    return (
        <View className="items-center justify-center">
            <Ionicons name={name} size={24} color={color} />
            {isDot && (
                <View className="absolute -right-1 bottom-0 w-2.5 h-2.5 bg-red-500 rounded-full border border-white" />
            )}
        </View>
    );
}

function CustomTabBar({ state, descriptors, navigation }) {
    const insets = useSafeAreaInsets();
    const { cartItems } = useCart();
    const { wishlistItems } = useWishlist();

    return (
        <View
            style={{
                flexDirection: 'row',
                backgroundColor: 'white',
                borderTopWidth: 1,
                borderTopColor: '#f3f4f6',
                paddingBottom: insets.bottom,
                paddingTop: 10,
                height: 60 + insets.bottom
            }}
        >
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                let iconName = 'alert-circle';
                let isDot = false;

                if (route.name === 'index') {
                    iconName = isFocused ? 'home' : 'home-outline';
                } else if (route.name === 'shop') {
                    iconName = isFocused ? 'search' : 'search-outline';
                } else if (route.name === 'wishlist') {
                    iconName = isFocused ? 'heart' : 'heart-outline';
                    isDot = wishlistItems.length > 0;
                } else if (route.name === 'cart') {
                    iconName = isFocused ? 'cart' : 'cart-outline';
                    isDot = cartItems.length > 0;
                } else if (route.name === 'profile') {
                    iconName = isFocused ? 'person' : 'person-outline';
                }

                const color = isFocused ? '#6B8E23' : '#9ca3af'; // Primary vs Gray

                return (
                    <TouchableOpacity
                        key={index}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        style={{ flex: 1, alignItems: 'center' }}
                    >
                        <TabBarIcon name={iconName} color={color} focused={isFocused} isDot={isDot} />
                        <Text style={{ color: color, fontSize: 10, marginTop: 4, fontWeight: isFocused ? '600' : '400' }}>
                            {label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

export default function TabLayout() {
    return (
        <Tabs tabBar={(props) => <CustomTabBar {...props} />} screenOptions={{ headerShown: false }}>
            <Tabs.Screen name="index" options={{ title: 'Ana Sayfa' }} />
            <Tabs.Screen name="shop" options={{ title: 'Keşfet' }} />
            <Tabs.Screen name="wishlist" options={{ title: 'Favoriler' }} />
            <Tabs.Screen name="cart" options={{ title: 'Sepetm' }} />
            <Tabs.Screen name="profile" options={{ title: 'Hesabım' }} />
        </Tabs>
    );
}
