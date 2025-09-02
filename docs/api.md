# API Documentation

This document provides detailed information about the REST API endpoints available in the DEX Terminal Clone (DTC) application.

## Base URL

```
http://localhost:5000/api
```

## Authentication

Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### Register a New User

```
POST /auth/register
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "jwt-token",
  "user": {
    "id": 1,
    "email": "user@example.com"
  }
}
```

### Login

```
POST /auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt-token",
  "user": {
    "id": 1,
    "email": "user@example.com"
  }
}
```

## Charts

### Get Chart Data

```
GET /charts/:pair/:timeframe
```

**Parameters:**
- `pair` (string): Trading pair (e.g., ETH/USDT)
- `timeframe` (string): Time interval (e.g., 1m, 5m, 15m, 1h, 4h, 1d)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "time": 1628784000000,
      "open": 3200.50,
      "high": 3210.25,
      "low": 3195.75,
      "close": 3205.00,
      "volume": 1250.50
    }
  ]
}
```

## Trades

### Execute a Trade

```
POST /trades
```

**Request Body:**
```json
{
  "pair": "ETH/USDT",
  "type": "buy",
  "amount": 1.25,
  "price": 3200.50,
  "orderType": "market",
  "slippage": 0.5
}
```

**Response:**
```json
{
  "success": true,
  "message": "Trade executed successfully",
  "trade": {
    "id": 123456,
    "pair": "ETH/USDT",
    "type": "buy",
    "amount": 1.25,
    "price": 3200.50,
    "status": "executed",
    "timestamp": "2023-05-15T10:30:00Z"
  }
}
```

### Get Trade History

```
GET /trades
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 123456,
      "pair": "ETH/USDT",
      "type": "buy",
      "amount": 1.25,
      "price": 3200.50,
      "status": "executed",
      "timestamp": "2023-05-15T10:30:00Z"
    }
  ]
}
```

## Webhooks

### Create a Webhook

```
POST /webhooks
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

**Response:**
```json
{
  "success": true,
  "message": "Webhook created successfully",
  "webhook": {
    "id": 1,
    "name": "Price Alert - ETH/USDT",
    "url": "https://your-endpoint.com/webhook",
    "event": "price_crossing",
    "pair": "ETH/USDT",
    "condition": "above",
    "value": "3200",
    "active": true,
    "createdAt": "2023-05-15T10:30:00Z"
  }
}
```

### Get All Webhooks

```
GET /webhooks
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Price Alert - ETH/USDT",
      "url": "https://your-endpoint.com/webhook",
      "event": "price_crossing",
      "pair": "ETH/USDT",
      "condition": "above",
      "value": "3200",
      "active": true,
      "createdAt": "2023-05-15T10:30:00Z"
    }
  ]
}
```

### Update a Webhook

```
PUT /webhooks/:id
```

**Request Body:**
```json
{
  "name": "Updated Price Alert",
  "active": false
}
```

**Response:**
```json
{
  "success": true,
  "message": "Webhook updated successfully",
  "webhook": {
    "id": 1,
    "name": "Updated Price Alert",
    "url": "https://your-endpoint.com/webhook",
    "event": "price_crossing",
    "pair": "ETH/USDT",
    "condition": "above",
    "value": "3200",
    "active": false,
    "createdAt": "2023-05-15T10:30:00Z"
  }
}
```

### Delete a Webhook

```
DELETE /webhooks/:id
```

**Response:**
```json
{
  "success": true,
  "message": "Webhook deleted successfully"
}
```

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error information"
}
```

## Rate Limiting

The API implements rate limiting to prevent abuse:
- 100 requests per hour per IP address
- 10 requests per minute per authenticated user

Exceeding these limits will result in a 429 (Too Many Requests) response.

## Webhook Payloads

### Price Crossing Event

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

### Trade Executed Event

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

## WebSocket Events

The application also provides real-time updates via WebSocket:

### Connection

```
ws://localhost:5000
```

### Events

1. `priceUpdate` - Real-time price updates
2. `tradeExecuted` - Notification when a trade is executed
3. `orderBookUpdate` - Order book changes

### Example Client Code

```javascript
const socket = io('http://localhost:5000');

// Subscribe to price updates
socket.emit('subscribe', { pair: 'ETH/USDT' });

// Listen for price updates
socket.on('priceUpdate', (data) => {
  console.log('Price update:', data);
});
```