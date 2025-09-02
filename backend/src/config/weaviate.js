// Weaviate Cloud configuration
require('dotenv').config();

const weaviate = require('weaviate-ts-client');

// Configuration for Weaviate Cloud
const config = {
  scheme: process.env.WEAVIATE_SCHEME || 'https',
  host: process.env.WEAVIATE_HOST || 'your-cluster-url.weaviate.cloud',
  apiKey: process.env.WEAVIATE_API_KEY || 'your-api-key',
};

// Create Weaviate client
const client = weaviate.client({
  scheme: config.scheme,
  host: config.host,
  headers: {
    'X-OpenAI-Api-Key': process.env.OPENAI_API_KEY, // Optional, for vectorization
    'X-Cohere-Api-Key': process.env.COHERE_API_KEY,  // Optional, for vectorization
  },
  authConfig: {
    apiKey: new weaviate.ApiKey(config.apiKey),
  },
});

module.exports = {
  client,
  config,
};