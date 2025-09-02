import { useState, useEffect, useCallback } from 'react';
import { chartAPI } from '../utils/api';
import { SOCKET_URL } from '../config/api';
import io from 'socket.io-client';

export const useChartData = (pair, timeframe) => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [socket, setSocket] = useState(null);

  const fetchChartData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await chartAPI.getChartData(pair, timeframe);
      setChartData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [pair, timeframe]);

  useEffect(() => {
    fetchChartData();
  }, [fetchChartData]);

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    // Listen for real-time price updates
    newSocket.on('priceUpdate', (data) => {
      if (data.pair === pair) {
        setChartData(prev => {
          const newData = [...prev];
          // Update the last data point or add a new one
          if (newData.length > 0) {
            const lastPoint = newData[newData.length - 1];
            if (lastPoint.time === data.time) {
              // Update existing point
              newData[newData.length - 1] = {
                ...lastPoint,
                close: data.price,
                high: Math.max(lastPoint.high, data.price),
                low: Math.min(lastPoint.low, data.price),
              };
            } else {
              // Add new point
              newData.push({
                time: data.time,
                open: data.price,
                high: data.price,
                low: data.price,
                close: data.price,
                volume: data.volume || 0,
              });
            }
          }
          return newData;
        });
      }
    });

    // Subscribe to price updates for this pair
    newSocket.emit('subscribe', { pair });

    return () => {
      // Unsubscribe and close socket connection
      newSocket.emit('unsubscribe', { pair });
      newSocket.close();
    };
  }, [pair]);

  return {
    chartData,
    loading,
    error,
    refreshChartData: fetchChartData,
  };
};