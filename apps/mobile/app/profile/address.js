import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert, ActivityIndicator, FlatList } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { getAddresses, addAddress, deleteAddress } from '../../services/api';

export default function AddressManagement() {
    const router = useRouter();
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);

    // Add Mode State
    const [isAdding, setIsAdding] = useState(false);
    const [formLoading, setFormLoading] = useState(false);

    // Form States
    const [title, setTitle] = useState('');
    const [fullAddress, setFullAddress] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
        try {
            const data = await getAddresses();
            setAddresses(data);
        } catch (error) {
            console.error('Error fetching addresses:', error);
            // Alert.alert('Hata', 'Adresler yüklenemedi.');
        } finally {
            setLoading(false);
        }
    };

    const handleAddAddress = async () => {
        if (!title || !fullAddress || !city || !district || !phone) {
            Alert.alert('Eksik Bilgi', 'Lütfen tüm alanları doldurun.');
            return;
        }

        setFormLoading(true);
        try {
            await addAddress({ title, full_address: fullAddress, city, district, phone });
            Alert.alert('Başarılı', 'Adresiniz kaydedildi.');
            setIsAdding(false);
            // Reset form
            setTitle(''); setFullAddress(''); setCity(''); setDistrict(''); setPhone('');
            // Refresh list
            fetchAddresses();
        } catch (error) {
            Alert.alert('Hata', 'Adres eklenirken bir sorun oluştu.');
        } finally {
            setFormLoading(false);
        }
    };

    const handleDelete = async (id) => {
        Alert.alert('Adresi Sil', 'Bu adresi silmek istediğinize emin misiniz?', [
            { text: 'Vazgeç', style: 'cancel' },
            {
                text: 'Sil', style: 'destructive', onPress: async () => {
                    try {
                        await deleteAddress(id);
                        setAddresses(prev => prev.filter(a => a.id !== id));
                    } catch (error) {
                        Alert.alert('Hata', 'Silinemedi.');
                    }
                }
            }
        ]);
    };

    const renderForm = () => (
        <View className="mb-6 bg-gray-50 p-4 rounded-xl border border-gray-200">
            <Text className="font-bold text-gray-800 mb-4 text-lg">Yeni Adres Ekle</Text>

            <Text className="label mb-1 text-gray-600">Adres Başlığı (Örn: Ev)</Text>
            <TextInput className="input mb-3 bg-white p-3 border border-gray-300 rounded-lg" value={title} onChangeText={setTitle} placeholder="Ev, İş..." />

            <Text className="label mb-1 text-gray-600">İl</Text>
            <TextInput className="input mb-3 bg-white p-3 border border-gray-300 rounded-lg" value={city} onChangeText={setCity} placeholder="İstanbul" />

            <Text className="label mb-1 text-gray-600">İlçe</Text>
            <TextInput className="input mb-3 bg-white p-3 border border-gray-300 rounded-lg" value={district} onChangeText={setDistrict} placeholder="Kadıköy" />

            <Text className="label mb-1 text-gray-600">Açık Adres</Text>
            <TextInput className="input mb-3 bg-white p-3 border border-gray-300 rounded-lg h-20" multiline value={fullAddress} onChangeText={setFullAddress} placeholder="Mahalle, sokak, kapı no..." />

            <Text className="label mb-1 text-gray-600">Telefon</Text>
            <TextInput className="input mb-4 bg-white p-3 border border-gray-300 rounded-lg" value={phone} onChangeText={setPhone} keyboardType="phone-pad" placeholder="05XXXXXXXXX" />

            <View className="flex-row space-x-3">
                <TouchableOpacity onPress={() => setIsAdding(false)} className="flex-1 bg-gray-300 p-3 rounded-lg items-center">
                    <Text className="font-bold text-gray-700">İptal</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleAddAddress} disabled={formLoading} className="flex-1 bg-primary p-3 rounded-lg items-center">
                    {formLoading ? <ActivityIndicator color="white" /> : <Text className="font-bold text-white">Kaydet</Text>}
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            <StatusBar style="dark" />
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <View className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100 bg-white">
                <View className="flex-row items-center">
                    <TouchableOpacity onPress={() => router.back()} className="mr-4">
                        <Ionicons name="arrow-back" size={24} color="#333" />
                    </TouchableOpacity>
                    <Text className="text-xl font-bold text-primary uppercase tracking-wide">Adreslerim</Text>
                </View>
                {!isAdding && (
                    <TouchableOpacity onPress={() => setIsAdding(true)}>
                        <Ionicons name="add-circle-outline" size={30} color="#6B8E23" />
                    </TouchableOpacity>
                )}
            </View>

            <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
                {isAdding && renderForm()}

                {loading ? (
                    <ActivityIndicator size="large" color="#6B8E23" className="mt-10" />
                ) : addresses.length === 0 && !isAdding ? (
                    <View className="items-center justify-center mt-20 opacity-50">
                        <Ionicons name="location-outline" size={60} color="gray" />
                        <Text className="text-gray-500 mt-4 text-center">Henüz kayıtlı adresiniz yok.{'\n'}Yukarıdaki + butonundan ekleyebilirsiniz.</Text>
                    </View>
                ) : (
                    addresses.map((addr) => (
                        <View key={addr.id} className="bg-white border border-gray-200 rounded-xl p-4 mb-4 shadow-sm relative">
                            <View className="flex-row justify-between items-start mb-2">
                                <View className="flex-row items-center">
                                    <Ionicons name={addr.title.toLowerCase().includes('iş') ? "briefcase-outline" : "home-outline"} size={20} color="#6B8E23" className="mr-2" />
                                    <Text className="font-bold text-lg text-gray-800">{addr.title}</Text>
                                </View>
                                <TouchableOpacity onPress={() => handleDelete(addr.id)} className="p-2 -mr-2 -mt-2">
                                    <Ionicons name="trash-outline" size={20} color="#EF4444" />
                                </TouchableOpacity>
                            </View>

                            <Text className="text-gray-600 mb-2 leading-5">{addr.full_address}</Text>
                            <Text className="text-gray-500 text-sm font-semibold">{addr.district} / {addr.city}</Text>
                            <Text className="text-gray-400 text-xs mt-2">{addr.phone}</Text>
                        </View>
                    ))
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
