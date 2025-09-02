#!/usr/bin/env node

// Weaviate Cloud Integration Setup Script
// This script helps set up Weaviate Cloud integration for xnox-me projects

const fs = require('fs');
const path = require('path');

console.log('Weaviate Cloud Integration Setup Script');
console.log('=====================================');

// Check if we're in a project directory
const projectRoot = process.cwd();
console.log(`Setting up Weaviate integration in: ${projectRoot}`);

// Create config directory if it doesn't exist
const configDir = path.join(projectRoot, 'config');
if (!fs.existsSync(configDir)) {
  fs.mkdirSync(configDir, { recursive: true });
  console.log('Created config directory');
}

// Create services directory if it doesn't exist
const servicesDir = path.join(projectRoot, 'services');
if (!fs.existsSync(servicesDir)) {
  fs.mkdirSync(servicesDir, { recursive: true });
  console.log('Created services directory');
}

// Create routes directory if it doesn't exist
const routesDir = path.join(projectRoot, 'routes');
if (!fs.existsSync(routesDir)) {
  fs.mkdirSync(routesDir, { recursive: true });
  console.log('Created routes directory');
}

// Weaviate configuration template
const weaviateConfig = `// Weaviate Cloud Configuration
require('dotenv').config();

const weaviate = require('weaviate-ts-client');

const config = {
  scheme: process.env.WEAVIATE_SCHEME || 'https',
  host: process.env.WEAVIATE_HOST || 'your-cluster-url.weaviate.cloud',
  apiKey: process.env.WEAVIATE_API_KEY || 'your-api-key',
};

const client = weaviate.client({
  scheme: config.scheme,
  host: config.host,
  headers: {
    'X-OpenAI-Api-Key': process.env.OPENAI_API_KEY,
    'X-Cohere-Api-Key': process.env.COHERE_API_KEY,
  },
  authConfig: {
    apiKey: new weaviate.ApiKey(config.apiKey),
  },
});

module.exports = { client, config };
`;

// Write configuration file
const configFile = path.join(configDir, 'weaviate.js');
fs.writeFileSync(configFile, weaviateConfig);
console.log('Created Weaviate configuration file');

// Weaviate service template
const weaviateService = `// Weaviate Service
const { client } = require('../config/weaviate');

class WeaviateService {
  async initializeSchema(classes) {
    try {
      for (const cls of classes) {
        await client.schema.classCreator().withClass(cls).do();
      }
      console.log('Weaviate schema initialized successfully');
      return true;
    } catch (error) {
      console.error('Error initializing Weaviate schema:', error);
      return false;
    }
  }

  async addData(className, data) {
    try {
      const result = await client.data.creator()
        .withClassName(className)
        .withProperties(data)
        .do();
      return result;
    } catch (error) {
      console.error(\`Error adding \${className}:\`, error);
      throw error;
    }
  }

  async search(className, query, limit = 10) {
    try {
      const result = await client.graphql
        .get()
        .withClassName(className)
        .withFields('YOUR_FIELDS_HERE')
        .withLimit(limit)
        .do();
      return result.data.Get[className];
    } catch (error) {
      console.error(\`Error searching \${className}:\`, error);
      throw error;
    }
  }

  async semanticSearch(className, query, limit = 10) {
    try {
      const result = await client.graphql
        .get()
        .withClassName(className)
        .withFields('YOUR_FIELDS_HERE')
        .withNearText({ concepts: [query] })
        .withLimit(limit)
        .do();
      return result.data.Get[className];
    } catch (error) {
      console.error(\`Error in semantic search for \${className}:\`, error);
      throw error;
    }
  }
}

module.exports = new WeaviateService();
`;

// Write service file
const serviceFile = path.join(servicesDir, 'weaviateService.js');
fs.writeFileSync(serviceFile, weaviateService);
console.log('Created Weaviate service file');

// Weaviate routes template
const weaviateRoutes = `// Weaviate Routes
const express = require('express');
const router = express.Router();
const weaviateService = require('../services/weaviateService');

// Search endpoint
router.get('/:className', async (req, res) => {
  try {
    const { className } = req.params;
    const { query, limit } = req.query;
    const results = await weaviateService.search(className, query, limit);
    res.json(results);
  } catch (error) {
    console.error('Error searching:', error);
    res.status(500).json({ error: 'Failed to search' });
  }
});

// Semantic search endpoint
router.get('/:className/semantic', async (req, res) => {
  try {
    const { className } = req.params;
    const { query, limit } = req.query;
    const results = await weaviateService.semanticSearch(className, query, limit);
    res.json(results);
  } catch (error) {
    console.error('Error in semantic search:', error);
    res.status(500).json({ error: 'Failed to perform semantic search' });
  }
});

// Add data endpoint
router.post('/:className', async (req, res) => {
  try {
    const { className } = req.params;
    const data = req.body;
    const result = await weaviateService.addData(className, data);
    res.json(result);
  } catch (error) {
    console.error('Error adding data:', error);
    res.status(500).json({ error: 'Failed to add data' });
  }
});

module.exports = router;
`;

// Write routes file
const routesFile = path.join(routesDir, 'weaviate.js');
fs.writeFileSync(routesFile, weaviateRoutes);
console.log('Created Weaviate routes file');

console.log('\nSetup complete!');
console.log('Next steps:');
console.log('1. Run "npm install weaviate-ts-client" to install the Weaviate client');
console.log('2. Create a .env file with your Weaviate Cloud configuration');
console.log('3. Define your data schema based on your project requirements');
console.log('4. Initialize the schema when your application starts');
console.log('5. Use the service methods to interact with Weaviate');