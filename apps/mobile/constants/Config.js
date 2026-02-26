import { Platform } from 'react-native';

const fallbackUrl = 'http://192.168.1.41:8000/api';
const API_URL = process.env.EXPO_PUBLIC_API_URL || fallbackUrl;

export default {
    API_URL,
    BASE_URL: process.env.EXPO_PUBLIC_API_URL ? process.env.EXPO_PUBLIC_API_URL.replace('/api', '') : fallbackUrl.replace('/api', '')
};
