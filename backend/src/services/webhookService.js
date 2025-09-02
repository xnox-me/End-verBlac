const axios = require('axios');
const Webhook = require('../models/Webhook');

class WebhookService {
  // Trigger webhooks based on price crossing events
  static async triggerPriceCrossingWebhooks(pair, currentPrice) {
    try {
      // Find active webhooks for this pair and event type
      const webhooks = await Webhook.find({
        pair,
        event: 'price_crossing',
        active: true
      });
      
      // Check each webhook
      for (const webhook of webhooks) {
        const targetPrice = parseFloat(webhook.value);
        
        // Check if condition is met
        let conditionMet = false;
        if (webhook.condition === 'above' && currentPrice >= targetPrice) {
          conditionMet = true;
        } else if (webhook.condition === 'below' && currentPrice <= targetPrice) {
          conditionMet = true;
        }
        
        if (conditionMet) {
          // Trigger webhook
          await this.sendWebhook(webhook, {
            event: 'price_crossing',
            pair,
            currentPrice,
            targetPrice,
            condition: webhook.condition,
            timestamp: new Date()
          });
        }
      }
    } catch (error) {
      console.error('Error triggering price crossing webhooks:', error);
    }
  }
  
  // Trigger webhooks when a trade is executed
  static async triggerTradeExecutedWebhooks(trade) {
    try {
      // Find active webhooks for this pair and event type
      const webhooks = await Webhook.find({
        pair: trade.pair,
        event: 'trade_executed',
        active: true
      });
      
      // Trigger each webhook
      for (const webhook of webhooks) {
        await this.sendWebhook(webhook, {
          event: 'trade_executed',
          trade,
          timestamp: new Date()
        });
      }
    } catch (error) {
      console.error('Error triggering trade executed webhooks:', error);
    }
  }
  
  // Send webhook request
  static async sendWebhook(webhook, payload) {
    try {
      await axios.post(webhook.url, payload, {
        timeout: 5000 // 5 second timeout
      });
      
      console.log(`Webhook triggered successfully: ${webhook.name}`);
    } catch (error) {
      console.error(`Error triggering webhook ${webhook.name}:`, error.message);
    }
  }
}

module.exports = WebhookService;