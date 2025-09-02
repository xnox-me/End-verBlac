const express = require('express');
const router = express.Router();

// Submit a new trade
router.post('/', async (req, res) => {
  try {
    const { pair, type, amount, price } = req.body;
    
    // In a real implementation, this would save to a database and execute the trade
    // For this example, we'll just return a success response
    const trade = {
      id: Math.floor(Math.random() * 1000000),
      pair,
      type,
      amount,
      price,
      timestamp: new Date(),
      status: 'executed'
    };
    
    // Emit trade event via socket.io
    req.app.get('io').emit('tradeExecuted', trade);
    
    res.json({
      success: true,
      message: 'Trade executed successfully',
      trade
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error executing trade',
      error: error.message
    });
  }
});

// Get recent trades
router.get('/', async (req, res) => {
  try {
    // In a real implementation, this would fetch from a database
    // For this example, we'll generate mock data
    const trades = generateMockTrades();
    
    res.json({
      success: true,
      data: trades
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching trades',
      error: error.message
    });
  }
});

// Generate mock trades
function generateMockTrades() {
  const trades = [];
  const pairs = ['ETH/USDT', 'BTC/USDT', 'BNB/USDT', 'SOL/USDT'];
  const types = ['buy', 'sell'];
  
  for (let i = 0; i < 20; i++) {
    const pair = pairs[Math.floor(Math.random() * pairs.length)];
    const type = types[Math.floor(Math.random() * types.length)];
    const amount = (Math.random() * 10).toFixed(4);
    const price = (Math.random() * 10000).toFixed(2);
    const timestamp = new Date(Date.now() - Math.random() * 10000000);
    
    trades.push({
      id: Math.floor(Math.random() * 1000000),
      pair,
      type,
      amount,
      price,
      timestamp
    });
  }
  
  // Sort by timestamp descending
  trades.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  
  return trades;
}

module.exports = router;