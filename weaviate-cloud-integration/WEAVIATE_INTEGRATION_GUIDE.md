# Weaviate Cloud Integration Guide for xnox-me Projects

This guide provides instructions for integrating Weaviate Cloud with all xnox-me projects including DEA, DEBT, and others.

## Prerequisites

1. Weaviate Cloud account (https://console.weaviate.cloud/)
2. API Key from your Weaviate Cloud cluster
3. Cluster URL from your Weaviate Cloud cluster

## General Integration Steps

### 1. Backend Integration

#### Install Dependencies
```bash
npm install weaviate-ts-client
```

#### Configuration File
Create a `weaviate.config.js` file:
```javascript
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
};

module.exports = { client, config };
```

#### Environment Variables
Add to your `.env` file:
```env
WEAVIATE_SCHEME=https
WEAVIATE_HOST=your-cluster-url.weaviate.cloud
WEAVIATE_API_KEY=your-weaviate-api-key
OPENAI_API_KEY=your-openai-api-key
COHERE_API_KEY=your-cohere-api-key
```

### 2. Service Layer Implementation

Create a `weaviateService.js` file:
```javascript
const { client } = require('./weaviate.config');

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
      console.error(`Error adding ${className}:`, error);
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
      console.error(`Error searching ${className}:`, error);
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
      console.error(`Error in semantic search for ${className}:`, error);
      throw error;
    }
  }
}

module.exports = new WeaviateService();
```

### 3. API Routes

Create a `weaviate.routes.js` file:
```javascript
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
```

### 4. Frontend Component (React)

Create a `WeaviateSearch.jsx` file:
```jsx
import React, { useState } from 'react';
import axios from 'axios';

const WeaviateSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [className, setClassName] = useState('');

  const handleSearch = async () => {
    if (!searchQuery.trim() || !className) return;
    
    setLoading(true);
    setSearchResults([]);
    
    try {
      const response = await axios.get(`/api/weaviate/${className}/semantic`, {
        params: { query: searchQuery, limit: 10 }
      });
      
      setSearchResults(response.data);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weaviate-search">
      <h2>Weaviate Semantic Search</h2>
      
      <div>
        <input
          type="text"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          placeholder="Enter class name..."
        />
        
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter search query..."
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        
        <button onClick={handleSearch} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
      
      {searchResults.length > 0 && (
        <div>
          <h3>Results:</h3>
          <ul>
            {searchResults.map((item, index) => (
              <li key={index}>{JSON.stringify(item)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WeaviateSearch;
```

## Project-Specific Integration Instructions

### DEA Project
1. Copy the integration files to the DEA project directory
2. Modify the schema definition to match DEA data models
3. Update the fields in the search functions to match DEA data structure
4. Configure the environment variables with DEA-specific Weaviate credentials

### DEBT Project
1. Copy the integration files to the DEBT project directory
2. Modify the schema definition to match DEBT data models
3. Update the fields in the search functions to match DEBT data structure
4. Configure the environment variables with DEBT-specific Weaviate credentials

### Other Projects
1. Follow the same pattern as above
2. Customize the schema and field definitions for each project's specific data models
3. Use project-specific environment variables

## Best Practices

1. Always use environment variables for sensitive information
2. Implement proper error handling
3. Use async/await for Weaviate operations
4. Test the integration thoroughly before deployment
5. Monitor Weaviate Cloud usage and costs
6. Implement caching where appropriate to reduce API calls

## Troubleshooting

1. **Connection Errors**: Verify your Weaviate Cloud credentials
2. **Schema Errors**: Check that class names match exactly
3. **API Key Issues**: Ensure your API key has the necessary permissions
4. **Rate Limiting**: Implement exponential backoff for heavy usage

## Security Considerations

1. Never commit API keys to version control
2. Use environment variables for all sensitive configuration
3. Implement proper authentication for API endpoints
4. Use HTTPS for all communications
5. Regularly rotate API keys