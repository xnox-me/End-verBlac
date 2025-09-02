const mongoose = require('mongoose');

const TradeSchema = new mongoose.Schema({
  pair: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['buy', 'sell']
  },
  amount: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'executed', 'cancelled']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Trade', TradeSchema);