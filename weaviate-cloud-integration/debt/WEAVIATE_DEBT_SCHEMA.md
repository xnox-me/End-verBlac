# Weaviate Schema for DEBT Project

This document defines the Weaviate schema for the DEBT (Decentralized Exchange Bot Trading) project.

## Classes

### 1. TradingStrategy
```javascript
const tradingStrategyClass = {
  class: 'DEBTStrategy',
  description: 'A trading strategy used by the DEBT platform',
  vectorizer: 'none',
  properties: [
    {
      name: 'name',
      dataType: ['string'],
      description: 'Name of the trading strategy',
    },
    {
      name: 'description',
      dataType: ['text'],
      description: 'Description of the trading strategy',
    },
    {
      name: 'type',
      dataType: ['string'],
      description: 'Type of strategy (arbitrage, market-making, etc.)',
    },
    {
      name: 'parameters',
      dataType: ['object'],
      description: 'Configuration parameters for the strategy',
    },
    {
      name: 'isActive',
      dataType: ['boolean'],
      description: 'Whether the strategy is currently active',
    },
    {
      name: 'createdAt',
      dataType: ['date'],
      description: 'Timestamp when the strategy was created',
    },
  ],
};
```

### 2. BotInstance
```javascript
const botInstanceClass = {
  class: 'DEBTBotInstance',
  description: 'An instance of a trading bot running on the DEBT platform',
  vectorizer: 'none',
  properties: [
    {
      name: 'name',
      dataType: ['string'],
      description: 'Name of the bot instance',
    },
    {
      name: 'strategy',
      dataType: ['string'],
      description: 'The strategy used by this bot',
    },
    {
      name: 'chains',
      dataType: ['string[]'],
      description: 'List of blockchain networks the bot operates on',
    },
    {
      name: 'tradingPairs',
      dataType: ['string[]'],
      description: 'List of trading pairs the bot operates on',
    },
    {
      name: 'status',
      dataType: ['string'],
      description: 'Current status of the bot (running, stopped, error)',
    },
    {
      name: 'performanceMetrics',
      dataType: ['object'],
      description: 'Performance metrics of the bot',
    },
    {
      name: 'lastActive',
      dataType: ['date'],
      description: 'Timestamp when the bot was last active',
    },
  ],
};
```

### 3. TradeExecution
```javascript
const tradeExecutionClass = {
  class: 'DEBTTradeExecution',
  description: 'A trade execution performed by a bot on the DEBT platform',
  vectorizer: 'none',
  properties: [
    {
      name: 'botId',
      dataType: ['string'],
      description: 'ID of the bot that executed the trade',
    },
    {
      name: 'tradingPair',
      dataType: ['string'],
      description: 'The trading pair symbol',
    },
    {
      name: 'chain',
      dataType: ['string'],
      description: 'The blockchain network',
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
      name: 'fee',
      dataType: ['number'],
      description: 'Transaction fee',
    },
    {
      name: 'timestamp',
      dataType: ['date'],
      description: 'Timestamp of the trade execution',
    },
    {
      name: 'status',
      dataType: ['string'],
      description: 'Status of the trade (completed, pending, failed)',
    },
  ],
};
```

## Integration Example

```javascript
// Example of initializing DEBT schema
const weaviateService = require('./weaviateService');

const initializeDEBTSchema = async () => {
  const classes = [tradingStrategyClass, botInstanceClass, tradeExecutionClass];
  await weaviateService.initializeSchema(classes);
};

// Example of adding a trading strategy
const addTradingStrategy = async (data) => {
  await weaviateService.addData('DEBTStrategy', data);
};

// Example of semantic search for trading strategies
const searchTradingStrategies = async (query) => {
  return await weaviateService.semanticSearch('DEBTStrategy', query);
};
```