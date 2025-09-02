// Weaviate routes for DODODEX Trading Platform
const express = require('express');
const router = express.Router();
const weaviateService = require('../services/weaviateService');

// Search trading pairs
router.get('/trading-pairs', async (req, res) => {
  try {
    const { query, limit } = req.query;
    const results = await weaviateService.searchTradingPairs(query, limit);
    res.json(results);
  } catch (error) {
    console.error('Error searching trading pairs:', error);
    res.status(500).json({ error: 'Failed to search trading pairs' });
  }
});

// Semantic search trading pairs
router.get('/trading-pairs/semantic', async (req, res) => {
  try {
    const { query, limit } = req.query;
    const results = await weaviateService.semanticSearchTradingPairs(query, limit);
    res.json(results);
  } catch (error) {
    console.error('Error in semantic search:', error);
    res.status(500).json({ error: 'Failed to perform semantic search' });
  }
});

// Add trading pair
router.post('/trading-pairs', async (req, res) => {
  try {
    const data = req.body;
    const result = await weaviateService.addTradingPair(data);
    res.json(result);
  } catch (error) {
    console.error('Error adding trading pair:', error);
    res.status(500).json({ error: 'Failed to add trading pair' });
  }
});

// Search trades
router.get('/trades', async (req, res) => {
  try {
    const { query, limit } = req.query;
    const results = await weaviateService.searchTrades(query, limit);
    res.json(results);
  } catch (error) {
    console.error('Error searching trades:', error);
    res.status(500).json({ error: 'Failed to search trades' });
  }
});

// Add trade
router.post('/trades', async (req, res) => {
  try {
    const data = req.body;
    const result = await weaviateService.addTrade(data);
    res.json(result);
  } catch (error) {
    console.error('Error adding trade:', error);
    res.status(500).json({ error: 'Failed to add trade' });
  }
});

// Search users
router.get('/users', async (req, res) => {
  try {
    const { query, limit } = req.query;
    const results = await weaviateService.searchUsers(query, limit);
    res.json(results);
  } catch (error) {
    console.error('Error searching users:', error);
    res.status(500).json({ error: 'Failed to search users' });
  }
});

// Add user
router.post('/users', async (req, res) => {
  try {
    const data = req.body;
    const result = await weaviateService.addUser(data);
    res.json(result);
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error: 'Failed to add user' });
  }
});

module.exports = router;