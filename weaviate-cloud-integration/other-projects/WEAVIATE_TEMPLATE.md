# Weaviate Integration Template for Other Projects

This is a template for integrating Weaviate Cloud with other xnox-me projects.

## Steps to Integrate

### 1. Define Your Data Schema

Create classes that represent your data entities:

```javascript
// Example class structure
const yourClass = {
  class: 'YourClassName', // Use a unique name for your project
  description: 'Description of your class',
  vectorizer: 'none', // or 'text2vec-openai', 'text2vec-cohere', etc.
  properties: [
    {
      name: 'propertyName',
      dataType: ['string'], // or 'number', 'boolean', 'date', etc.
      description: 'Description of the property',
    },
    // Add more properties as needed
  ],
};
```

### 2. Initialize the Schema

```javascript
const weaviateService = require('./weaviateService');

const initializeSchema = async () => {
  const classes = [yourClass1, yourClass2, yourClass3];
  await weaviateService.initializeSchema(classes);
};
```

### 3. Add Data

```javascript
const addData = async (data) => {
  await weaviateService.addData('YourClassName', data);
};
```

### 4. Search Data

```javascript
// Regular search
const searchData = async (query) => {
  return await weaviateService.search('YourClassName', query);
};

// Semantic search
const semanticSearch = async (query) => {
  return await weaviateService.semanticSearch('YourClassName', query);
};
```

## Common Data Types

### User Profile
```javascript
const userClass = {
  class: 'ProjectUser',
  description: 'A user of the platform',
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
      name: 'preferences',
      dataType: ['text'],
      description: 'User preferences and settings',
    },
    {
      name: 'createdAt',
      dataType: ['date'],
      description: 'Timestamp when user joined',
    },
  ],
};
```

### Document/Content
```javascript
const documentClass = {
  class: 'ProjectDocument',
  description: 'A document or content piece',
  vectorizer: 'text2vec-openai', // Enable vectorization for content
  properties: [
    {
      name: 'title',
      dataType: ['string'],
      description: 'Title of the document',
    },
    {
      name: 'content',
      dataType: ['text'],
      description: 'Main content of the document',
    },
    {
      name: 'tags',
      dataType: ['string[]'],
      description: 'Tags associated with the document',
    },
    {
      name: 'author',
      dataType: ['string'],
      description: 'Author of the document',
    },
    {
      name: 'createdAt',
      dataType: ['date'],
      description: 'Timestamp when document was created',
    },
  ],
};
```

### Transaction/Event
```javascript
const transactionClass = {
  class: 'ProjectTransaction',
  description: 'A transaction or event',
  vectorizer: 'none',
  properties: [
    {
      name: 'type',
      dataType: ['string'],
      description: 'Type of transaction or event',
    },
    {
      name: 'amount',
      dataType: ['number'],
      description: 'Amount involved in the transaction',
    },
    {
      name: 'status',
      dataType: ['string'],
      description: 'Status of the transaction',
    },
    {
      name: 'timestamp',
      dataType: ['date'],
      description: 'Timestamp of the transaction',
    },
  ],
};
```

## Environment Configuration

Create a `.env` file with your Weaviate Cloud configuration:

```env
# Weaviate Cloud Configuration
WEAVIATE_SCHEME=https
WEAVIATE_HOST=your-cluster-url.weaviate.cloud
WEAVIATE_API_KEY=your-weaviate-api-key

# Optional API Keys for vectorization
OPENAI_API_KEY=your-openai-api-key
COHERE_API_KEY=your-cohere-api-key
```

## Best Practices

1. Use descriptive class and property names
2. Include timestamps for time-based data
3. Use appropriate data types for each property
4. Enable vectorization for text content that needs semantic search
5. Keep class names unique across your projects
6. Document your schema clearly
7. Test your integration thoroughly