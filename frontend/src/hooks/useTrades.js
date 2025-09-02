import { useState, useEffect } from 'react';
import { tradeAPI } from '../utils/api';

export const useTrades = () => {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTrades = async () => {
    try {
      setLoading(true);
      const response = await tradeAPI.getTrades();
      setTrades(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const executeTrade = async (tradeData) => {
    try {
      const response = await tradeAPI.executeTrade(tradeData);
      setTrades(prev => [response.trade, ...prev]);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchTrades();
  }, []);

  return {
    trades,
    loading,
    error,
    executeTrade,
    refreshTrades: fetchTrades,
  };
};