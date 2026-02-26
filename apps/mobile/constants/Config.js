import { Platform } from 'react-native';
import Constants from 'expo-constants';

let host = '192.168.1.41'; // Fallback host

if (Constants.expoConfig?.hostUri) {
    host = Constants.expoConfig.hostUri.split(':')[0];
}

const fallbackUrl = `http://${host}:8000/api`;
const API_URL = process.env.EXPO_PUBLIC_API_URL || fallbackUrl;

export default {
    API_URL,
    BASE_URL: API_URL.replace('/api', '')
};
