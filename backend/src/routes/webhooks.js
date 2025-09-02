const express = require('express');
const router = express.Router();

// Create a new webhook
router.post('/', async (req, res) => {
  try {
    const { name, url, event, pair, condition, value } = req.body;
    
    // In a real implementation, this would save to a database
    // For this example, we'll just return a success response
    const webhook = {
      id: Math.floor(Math.random() * 1000000),
      name,
      url,
      event,
      pair,
      condition,
      value,
      active: true,
      createdAt: new Date()
    };
    
    res.json({
      success: true,
      message: 'Webhook created successfully',
      webhook
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating webhook',
      error: error.message
    });
  }
});

// Get all webhooks
router.get('/', async (req, res) => {
  try {
    // In a real implementation, this would fetch from a database
    // For this example, we'll generate mock data
    const webhooks = generateMockWebhooks();
    
    res.json({
      success: true,
      data: webhooks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching webhooks',
      error: error.message
    });
  }
});

// Update a webhook
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    // In a real implementation, this would update in a database
    // For this example, we'll just return a success response
    res.json({
      success: true,
      message: 'Webhook updated successfully',
      webhook: { id, ...updates }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating webhook',
      error: error.message
    });
  }
});

// Delete a webhook
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // In a real implementation, this would delete from a database
    // For this example, we'll just return a success response
    res.json({
      success: true,
      message: 'Webhook deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting webhook',
      error: error.message
    });
  }
});

// Generate mock webhooks
function generateMockWebhooks() {
  return [
    {
      id: 1,
      name: 'Price Alert - ETH/USDT',
      url: 'https://example.com/webhook/eth-alert',
      event: 'price_crossing',
      pair: 'ETH/USDT',
      condition: 'above',
      value: '3200',
      active: true,
      createdAt: new Date(Date.now() - 86400000)
    },
    {
      id: 2,
      name: 'Trade Execution',
      url: 'https://example.com/webhook/trade-executed',
      event: 'trade_executed',
      pair: 'BTC/USDT',
      condition: '',
      value: '',
      active: false,
      createdAt: new Date(Date.now() - 172800000)
    }
  ];
}

module.exports = router;