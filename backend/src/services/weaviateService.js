// Weaviate Service for DODODEX Trading Platform
const { client } = require('../config/weaviate');

class WeaviateService {
  // Initialize Weaviate schema for trading data
  async initializeSchema() {
    try {
      // Define schema for trading pairs
      const tradingPairClass = {
        class: 'TradingPair',
        description: 'A trading pair in the DODODEX platform',
        vectorizer: 'none', // We'll provide our own vectors
        properties: [
          {
            name: 'symbol',
            dataType: ['string'],
            description: 'The trading pair symbol (e.g., ETH/USDT)',
          },
          {
            name: 'baseAsset',
            dataType: ['string'],
            description: 'The base asset of the trading pair',
          },
          {
            name: 'quoteAsset',
            dataType: ['string'],
            description: 'The quote asset of the trading pair',
          },
          {
            name: 'chain',
            dataType: ['string'],
            description: 'The blockchain network',
          },
          {
            name: 'price',
            dataType: ['number'],
            description: 'Current price of the trading pair',
          },
          {
            name: 'volume24h',
            dataType: ['number'],
            description: '24-hour trading volume',
          },
          {
            name: 'timestamp',
            dataType: ['date'],
            description: 'Timestamp of the data',
          },
        ],
      };

      // Define schema for trade history
      const tradeClass = {
        class: 'Trade',
        description: 'A trade executed on the DODODEX platform',
        vectorizer: 'none',
        properties: [
          {
            name: 'tradingPair',
            dataType: ['string'],
            description: 'The trading pair symbol',
          },
          {
            name: 'userId',
            dataType: ['string'],
            description: 'ID of the user who executed the trade',
          },
          {
            name: 'type',
            dataType: ['string'],
            description: 'Type of trade (buy/sell)',
          },
          {
            name: 'amount',
            dataType: ['number'],
            description: 'Amount of base asset traded',
          },
          {
            name: 'price',
            dataType: ['number'],
            description: 'Price per unit',
          },
          {
            name: 'total',
            dataType: ['number'],
            description: 'Total value of the trade',
          },
          {
            name: 'timestamp',
            dataType: ['date'],
            description: 'Timestamp of the trade',
          },
          {
            name: 'status',
            dataType: ['string'],
            description: 'Status of the trade (completed, pending, failed)',
          },
        ],
      };

      // Define schema for user profiles
      const userClass = {
        class: 'User',
        description: 'A user of the DODODEX platform',
        vectorizer: 'none',
        properties: [
          {
            name: 'username',
            dataType: ['string'],
            description: 'Username of the user',
          },
          {
            name: 'email',
            dataType: ['string'],
            description: 'Email address of the user',
          },
          {
            name: 'walletAddress',
            dataType: ['string'],
            description: 'Blockchain wallet address',
          },
          {
            name: 'preferences',
            dataType: ['text'],
            description: 'User preferences and settings',
          },
          {
            name: 'portfolioValue',
            dataType: ['number'],
            description: 'Current portfolio value',
          },
          {
            name: 'joinDate',
            dataType: ['date'],
            description: 'Date when user joined the platform',
          },
        ],
      };

      // Create classes in Weaviate
      await client.schema.classCreator().withClass(tradingPairClass).do();
      await client.schema.classCreator().withClass(tradeClass).do();
      await client.schema.classCreator().withClass(userClass).do();

      console.log('Weaviate schema initialized successfully');
      return true;
    } catch (error) {
      console.error('Error initializing Weaviate schema:', error);
      return false;
    }
  }

  // Add trading pair data
  async addTradingPair(data) {
    try {
      const result = await client.data.creator()
        .withClassName('TradingPair')
        .withProperties(data)
        .do();
      
      return result;
    } catch (error) {
      console.error('Error adding trading pair:', error);
      throw error;
    }
  }

  // Add trade data
  async addTrade(data) {
    try {
      const result = await client.data.creator()
        .withClassName('Trade')
        .withProperties(data)
        .do();
      
      return result;
    } catch (error) {
      console.error('Error adding trade:', error);
      throw error;
    }
  }

  // Add user data
  async addUser(data) {
    try {
      const result = await client.data.creator()
        .withClassName('User')
        .withProperties(data)
        .do();
      
      return result;
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  }

  // Search for trading pairs
  async searchTradingPairs(query, limit = 10) {
    try {
      const result = await client.graphql
        .get()
        .withClassName('TradingPair')
        .withFields('symbol baseAsset quoteAsset chain price volume24h timestamp')
        .withLimit(limit)
        .do();
      
      return result.data.Get.TradingPair;
    } catch (error) {
      console.error('Error searching trading pairs:', error);
      throw error;
    }
  }

  // Search for trades
  async searchTrades(query, limit = 10) {
    try {
      const result = await client.graphql
        .get()
        .withClassName('Trade')
        .withFields('tradingPair userId type amount price total timestamp status')
        .withLimit(limit)
        .do();
      
      return result.data.Get.Trade;
    } catch (error) {
      console.error('Error searching trades:', error);
      throw error;
    }
  }

  // Search for users
  async searchUsers(query, limit = 10) {
    try {
      const result = await client.graphql
        .get()
        .withClassName('User')
        .withFields('username email walletAddress preferences portfolioValue joinDate')
        .withLimit(limit)
        .do();
      
      return result.data.Get.User;
    } catch (error) {
      console.error('Error searching users:', error);
      throw error;
    }
  }

  // Semantic search for trading pairs
  async semanticSearchTradingPairs(query, limit = 10) {
    try {
      const result = await client.graphql
        .get()
        .withClassName('TradingPair')
        .withFields('symbol baseAsset quoteAsset chain price volume24h timestamp')
        .withNearText({ concepts: [query] })
        .withLimit(limit)
        .do();
      
      return result.data.Get.TradingPair;
    } catch (error) {
      console.error('Error in semantic search for trading pairs:', error);
      throw error;
    }
  }
}

module.exports = new WeaviateService();