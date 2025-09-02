import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_ENDPOINTS.BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => apiClient.post(API_ENDPOINTS.REGISTER, userData),
  login: (credentials) => apiClient.post(API_ENDPOINTS.LOGIN, credentials),
};

// Chart API
export const chartAPI = {
  getChartData: (pair, timeframe) => 
    apiClient.get(API_ENDPOINTS.CHART_DATA(pair, timeframe)),
};

// Trade API
export const tradeAPI = {
  executeTrade: (tradeData) => apiClient.post(API_ENDPOINTS.TRADES, tradeData),
  getTrades: () => apiClient.get(API_ENDPOINTS.TRADES),
};

// Webhook API
export const webhookAPI = {
  createWebhook: (webhookData) => apiClient.post(API_ENDPOINTS.WEBHOOKS, webhookData),
  getWebhooks: () => apiClient.get(API_ENDPOINTS.WEBHOOKS),
  updateWebhook: (id, webhookData) => apiClient.put(API_ENDPOINTS.WEBHOOK(id), webhookData),
  deleteWebhook: (id) => apiClient.delete(API_ENDPOINTS.WEBHOOK(id)),
};

export default apiClient;