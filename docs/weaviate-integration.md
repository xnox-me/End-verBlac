# Weaviate Cloud Integration

This document describes how the DODODEX Trading Platform integrates with Weaviate Cloud for enhanced search and data management capabilities.

## Overview

Weaviate Cloud is a fully managed vector database that provides semantic search capabilities for the DODODEX platform. This integration enables:

1. Semantic search across trading pairs, trades, and user data
2. Enhanced data organization and retrieval
3. Scalable data management
4. AI-powered insights

## Architecture

The integration follows this architecture:

```
Frontend <-> Backend API <-> MongoDB (Primary DB) <-> Weaviate Cloud (Semantic Search)
```

- **MongoDB**: Primary database for transactional data
- **Weaviate Cloud**: Vector database for semantic search and AI-powered queries

## Setup

### 1. Weaviate Cloud Account

1. Sign up for a Weaviate Cloud account at [https://console.weaviate.cloud/](https://console.weaviate.cloud/)
2. Create a new cluster
3. Note down your cluster URL and API key

### 2. Environment Configuration

Create a `.env` file in the backend directory with the following variables:

```env
# Weaviate Cloud Configuration
WEAVIATE_SCHEME=https
WEAVIATE_HOST=your-cluster-url.weaviate.cloud
WEAVIATE_API_KEY=your-weaviate-api-key

# Optional API Keys for vectorization
OPENAI_API_KEY=your-openai-api-key
COHERE_API_KEY=your-cohere-api-key
```

### 3. Schema Initialization

The Weaviate schema is automatically initialized when the server starts. The schema includes:

- **TradingPair**: Represents trading pairs with symbol, assets, price, and volume
- **Trade**: Represents individual trades with type, amount, price, and status
- **User**: Represents user profiles with preferences and portfolio data

## API Endpoints

### Trading Pairs

- `GET /api/weaviate/trading-pairs` - Search trading pairs
- `GET /api/weaviate/trading-pairs/semantic` - Semantic search trading pairs
- `POST /api/weaviate/trading-pairs` - Add a new trading pair

### Trades

- `GET /api/weaviate/trades` - Search trades
- `POST /api/weaviate/trades` - Add a new trade

### Users

- `GET /api/weaviate/users` - Search users
- `POST /api/weaviate/users` - Add a new user

## Semantic Search Examples

### Search for Trading Pairs

```bash
# Regular search
curl "http://localhost:5000/api/weaviate/trading-pairs?query=ETH&limit=10"

# Semantic search
curl "http://localhost:5000/api/weaviate/trading-pairs/semantic?query=popular%20Ethereum%20pairs&limit=10"
```

## Data Synchronization

Data is synchronized between MongoDB and Weaviate Cloud in real-time:

1. When new trading pairs are added to MongoDB, they are also added to Weaviate
2. When trades are executed, they are stored in both databases
3. User profile updates are reflected in both systems

## Benefits

1. **Enhanced Search**: Semantic search capabilities beyond traditional keyword search
2. **AI-Powered Insights**: Leverage vector embeddings for intelligent data analysis
3. **Scalability**: Weaviate Cloud handles large-scale data with ease
4. **Flexibility**: Easy to extend with new data types and relationships

## Troubleshooting

### Common Issues

1. **Connection Errors**: Verify your Weaviate Cloud credentials in the `.env` file
2. **Schema Errors**: Check that the Weaviate cluster is accessible and the schema is properly initialized
3. **API Key Issues**: Ensure your API key has the necessary permissions

### Logs

Check the server logs for Weaviate-related messages:

```bash
# In the backend directory
npm run dev
```

Look for messages like:
- "Weaviate schema initialized successfully"
- "Error initializing Weaviate"

## Future Enhancements

1. Integration with more AI models for advanced vectorization
2. Real-time data streaming to Weaviate
3. Enhanced recommendation engines using Weaviate's capabilities
4. Natural language querying interface