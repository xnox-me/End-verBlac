const mongoose = require('mongoose');

const WebhookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  event: {
    type: String,
    required: true
  },
  pair: {
    type: String,
    required: true
  },
  condition: {
    type: String,
    default: ''
  },
  value: {
    type: String,
    default: ''
  },
  active: {
    type: Boolean,
    default: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Webhook', WebhookSchema);