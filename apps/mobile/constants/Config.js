import { Platform } from 'react-native';

const API_URL = Platform.select({
    ios: 'http://192.168.1.80:8000/api',
    android: 'http://192.168.1.80:8000/api',
    default: 'http://192.168.1.80:8000/api',
});

export default {
    API_URL,
};
