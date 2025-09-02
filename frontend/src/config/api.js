const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  // Auth endpoints
  REGISTER: `${API_BASE_URL}/auth/register`,
  LOGIN: `${API_BASE_URL}/auth/login`,
  
  // Chart endpoints
  CHART_DATA: (pair, timeframe) => `${API_BASE_URL}/charts/${pair}/${timeframe}`,
  
  // Trade endpoints
  TRADES: `${API_BASE_URL}/trades`,
  
  // Webhook endpoints
  WEBHOOKS: `${API_BASE_URL}/webhooks`,
  WEBHOOK: (id) => `${API_BASE_URL}/webhooks/${id}`,
};

export const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';

export const DEFAULT_TRADING_PAIR = 'ETH/USDT';
export const DEFAULT_TIMEFRAME = '1h';

export const TIMEFRAMES = [
  { value: '1m', label: '1 Minute' },
  { value: '5m', label: '5 Minutes' },
  { value: '15m', label: '15 Minutes' },
  { value: '1h', label: '1 Hour' },
  { value: '4h', label: '4 Hours' },
  { value: '1d', label: '1 Day' },
];

export const TRADING_PAIRS = [
  'ETH/USDT',
  'BTC/USDT',
  'BNB/USDT',
  'SOL/USDT',
  'MATIC/USDT',
  'AVAX/USDT',
  'DOT/USDT',
  'LINK/USDT',
];