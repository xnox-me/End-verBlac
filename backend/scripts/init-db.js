const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import models
const User = require('../src/models/User');
const Webhook = require('../src/models/Webhook');
const Trade = require('../src/models/Trade');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tradingview-clone', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Sample data
const sampleUsers = [
  {
    email: 'user@example.com',
    password: '$2a$10$8K1p/a0dURXAm7QiTRqUzuN0/SpuDMaM1YWSpH5q/xaKfqu005KJG' // password123
  }
];

const sampleWebhooks = [
  {
    name: 'Price Alert - ETH/USDT',
    url: 'https://example.com/webhook/eth-alert',
    event: 'price_crossing',
    pair: 'ETH/USDT',
    condition: 'above',
    value: '3200',
    userId: null // Will be set after user creation
  }
];

const sampleTrades = [
  {
    pair: 'ETH/USDT',
    type: 'buy',
    amount: 1.25,
    price: 3200.50,
    userId: null, // Will be set after user creation
    status: 'executed'
  }
];

async function initDB() {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Webhook.deleteMany({});
    await Trade.deleteMany({});
    
    console.log('Existing data cleared');
    
    // Create users
    const users = await User.insertMany(sampleUsers);
    console.log('Users created:', users.length);
    
    // Update references
    sampleWebhooks[0].userId = users[0]._id;
    sampleTrades[0].userId = users[0]._id;
    
    // Create webhooks
    const webhooks = await Webhook.insertMany(sampleWebhooks);
    console.log('Webhooks created:', webhooks.length);
    
    // Create trades
    const trades = await Trade.insertMany(sampleTrades);
    console.log('Trades created:', trades.length);
    
    console.log('Database initialized successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

// Run the initialization
initDB();