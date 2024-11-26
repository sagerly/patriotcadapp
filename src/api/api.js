// src/api/api.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_CONFIG } from '../constants/config';
import { ENDPOINTS } from './endpoints';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
});

// Request interceptor with logging
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('userToken');
    
    // Log request details
    console.log('API Request:', {
      url: `${config.baseURL}${config.url}`,
      method: config.method.toUpperCase(),
      data: config.data,
      headers: config.headers
    });

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor with enhanced error handling
api.interceptors.response.use(
  (response) => {
    // Log successful response
    console.log('API Response:', {
      status: response.status,
      data: response.data,
      url: response.config.url
    });
    return response;
  },
  async (error) => {
    // Log error details
    console.error('API Error:', {
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url,
      method: error.config?.method
    });

    // Handle different error scenarios
    if (error.response) {
      switch (error.response.status) {
        case 401:
          await AsyncStorage.removeItem('userToken');
          // You might want to trigger a navigation event here
          break;
        case 403:
          console.error('Permission denied');
          break;
        case 404:
          console.error('Resource not found');
          break;
        case 422:
          console.error('Validation error');
          break;
        case 500:
          console.error('Server error');
          break;
      }
    } else if (error.request) {
      console.error('Network error - no response received');
    } else {
      console.error('Error setting up request:', error.message);
    }

    return Promise.reject(error);
  }
);


export const loginUser = async (email, password) => {
  try {
    const response = await api.post(ENDPOINTS.LOGIN, {
      email,
      password,
    });

    if (response.data.token) {
      await AsyncStorage.setItem('userToken', response.data.token);
      if (response.data.user) {
        await AsyncStorage.setItem('userData', JSON.stringify(response.data.user));
      }
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await api.post(ENDPOINTS.REGISTER, {
      badge_id: userData.badgeId,
      email: userData.email,
      password: userData.password,
      department: userData.department,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const logout = async () => {
  try {
    await api.post(ENDPOINTS.LOGOUT);
    await AsyncStorage.removeItem('userToken');
  } catch (error) {
    console.error('Logout error:', error);
    await AsyncStorage.removeItem('userToken');
  }
};

export const isAuthenticated = async () => {  // Fixed 'async' spelling
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) return false;
    return true;
  } catch (error) {
    console.error('Auth check failed:', error);
    return false;
  }
};

export const getUserData = async () => {
  try {
    const userData = await AsyncStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

