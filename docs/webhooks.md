# Webhook System Documentation

The webhook system allows users to receive real-time notifications for various events in the trading platform.

## Webhook Types

### 1. Price Crossing
Triggered when the price of a trading pair crosses a specified threshold.

**Payload:**
```json
{
  "event": "price_crossing",
  "pair": "ETH/USDT",
  "currentPrice": 3200.50,
  "targetPrice": 3200.00,
  "condition": "above",
  "timestamp": "2023-05-15T10:30:00Z"
}
```

### 2. Trade Executed
Triggered when a trade is executed on the platform.

**Payload:**
```json
{
  "event": "trade_executed",
  "trade": {
    "id": 123456,
    "pair": "ETH/USDT",
    "type": "buy",
    "amount": 1.25,
    "price": 3200.50,
    "timestamp": "2023-05-15T10:30:00Z"
  },
  "timestamp": "2023-05-15T10:30:00Z"
}
```

### 3. Order Book Change
Triggered when there is a significant change in the order book.

**Payload:**
```json
{
  "event": "order_book_change",
  "pair": "ETH/USDT",
  "changeType": "large_bid_added",
  "details": {
    "price": 3199.50,
    "amount": 10.0,
    "totalValue": 31995.00
  },
  "timestamp": "2023-05-15T10:30:00Z"
}
```

## Creating Webhooks

Webhooks can be created through the Webhook Manager interface or via the API.

### API Endpoint
```
POST /api/webhooks
```

**Request Body:**
```json
{
  "name": "Price Alert - ETH/USDT",
  "url": "https://your-endpoint.com/webhook",
  "event": "price_crossing",
  "pair": "ETH/USDT",
  "condition": "above",
  "value": "3200"
}
```

## Managing Webhooks

Webhooks can be enabled, disabled, or deleted through the Webhook Manager interface or via the API.

### Update Webhook
```
PUT /api/webhooks/:id
```

### Delete Webhook
```
DELETE /api/webhooks/:id
```

## Security Considerations

1. **URL Validation** - Only HTTPS endpoints are allowed
2. **Rate Limiting** - Webhooks are rate-limited to prevent abuse
3. **Payload Verification** - Implement payload verification on your endpoint
4. **Timeout Handling** - Webhook requests timeout after 5 seconds

## Best Practices

1. **Implement Retry Logic** - Handle temporary failures gracefully
2. **Verify Payloads** - Check the integrity of incoming webhook data
3. **Respond Quickly** - Acknowledge webhook requests promptly
4. **Log Events** - Keep track of webhook activity for debugging
5. **Handle Errors** - Implement proper error handling in your webhook endpoint

## Example Webhook Receiver

Here's a simple example of a webhook receiver in Node.js:

```javascript
const express = require('express');
const app = express();

app.use(express.json());

app.post('/webhook', (req, res) => {
  const { event, timestamp, ...data } = req.body;
  
  // Process the webhook event
  switch (event) {
    case 'price_crossing':
      console.log(`Price crossing alert for ${data.pair}`);
      break;
    case 'trade_executed':
      console.log(`Trade executed: ${data.trade.type} ${data.trade.amount} ${data.trade.pair}`);
      break;
    default:
      console.log('Unknown event:', event);
  }
  
  // Acknowledge the webhook
  res.status(200).send('OK');
});

app.listen(3001, () => {
  console.log('Webhook receiver listening on port 3001');
});
```