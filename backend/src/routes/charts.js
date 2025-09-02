const express = require('express');
const router = express.Router();

// Get chart data for a specific pair and timeframe
router.get('/:pair/:timeframe', async (req, res) => {
  try {
    const { pair, timeframe } = req.params;
    
    // In a real implementation, this would fetch data from a database or external API
    // For this example, we'll generate mock data
    const mockData = generateMockChartData(pair, timeframe);
    
    res.json({
      success: true,
      data: mockData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching chart data',
      error: error.message
    });
  }
});

// Generate mock chart data
function generateMockChartData(pair, timeframe) {
  const data = [];
  const now = Date.now();
  let basePrice = 3200; // Starting price for ETH/USDT
  
  // Adjust base price based on pair
  if (pair === 'BTC/USDT') basePrice = 84200;
  if (pair === 'BNB/USDT') basePrice = 580;
  if (pair === 'SOL/USDT') basePrice = 142;
  
  // Generate mock data points
  for (let i = 100; i >= 0; i--) {
    const time = now - i * getIntervalMillis(timeframe);
    const open = basePrice + (Math.random() - 0.5) * basePrice * 0.02;
    const high = open * (1 + Math.random() * 0.01);
    const low = open * (1 - Math.random() * 0.01);
    const close = low + (high - low) * Math.random();
    const volume = Math.random() * 1000;
    
    data.push({
      time,
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
      volume: parseFloat(volume.toFixed(2))
    });
    
    basePrice = close;
  }
  
  return data;
}

// Get interval in milliseconds based on timeframe
function getIntervalMillis(timeframe) {
  const intervals = {
    '1m': 60 * 1000,
    '5m': 5 * 60 * 1000,
    '15m': 15 * 60 * 1000,
    '1h': 60 * 60 * 1000,
    '4h': 4 * 60 * 60 * 1000,
    '1d': 24 * 60 * 60 * 1000
  };
  
  return intervals[timeframe] || intervals['1h'];
}

module.exports = router;