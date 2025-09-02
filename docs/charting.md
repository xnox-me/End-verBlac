# Charting System Documentation

The charting system provides real-time visualization of market data with TradingView-like features.

## Chart Types

### 1. Candlestick Charts
Traditional candlestick charts showing open, high, low, and close prices.

### 2. Line Charts
Simple line charts showing price movements over time.

### 3. Bar Charts
Bar charts displaying price data in a different visual format.

### 4. Area Charts
Area charts with filled areas under the price line.

## Timeframes

- 1 minute (1m)
- 5 minutes (5m)
- 15 minutes (15m)
- 1 hour (1h)
- 4 hours (4h)
- 1 day (1d)

## Technical Indicators

### Trend Indicators
- Moving Averages (SMA, EMA)
- MACD
- Parabolic SAR

### Oscillator Indicators
- RSI
- Stochastic Oscillator
- Williams %R

### Volume Indicators
- Volume
- On-Balance Volume (OBV)
- Volume Weighted Average Price (VWAP)

### Volatility Indicators
- Bollinger Bands
- Average True Range (ATR)

## Chart Interactions

### Drawing Tools
- Trend Lines
- Horizontal Lines
- Fibonnaci Retracements
- Shapes and Annotations

### Chart Controls
- Zoom in/out
- Pan horizontally and vertically
- Timeframe selection
- Indicator management

## Data Structure

Chart data is provided in the following format:

```json
{
  "time": 1684137600000,
  "open": 3200.50,
  "high": 3210.25,
  "low": 3195.75,
  "close": 3205.00,
  "volume": 1250.50
}
```

## API Endpoints

### Get Chart Data
```
GET /api/charts/:pair/:timeframe
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "time": 1684137600000,
      "open": 3200.50,
      "high": 3210.25,
      "low": 3195.75,
      "close": 3205.00,
      "volume": 1250.50
    }
  ]
}
```

## Real-time Updates

The charting system uses Socket.IO for real-time updates. Clients can subscribe to price updates for specific trading pairs.

### Socket Events

- `priceUpdate` - Real-time price updates
- `chartUpdate` - Chart data updates
- `indicatorUpdate` - Indicator value updates

### Example Client Implementation

```javascript
const socket = io('http://localhost:5000');

// Subscribe to price updates for ETH/USDT
socket.emit('subscribe', { pair: 'ETH/USDT' });

// Listen for price updates
socket.on('priceUpdate', (data) => {
  console.log('Price update:', data);
});

// Unsubscribe when done
socket.emit('unsubscribe', { pair: 'ETH/USDT' });
```

## Customization

### Chart Settings
- Color schemes
- Grid visibility
- Scale types (linear, logarithmic)
- Timezone settings

### Indicator Settings
- Period values
- Color customization
- Line thickness
- Display options

## Performance Considerations

1. **Data Aggregation** - Data is aggregated on the server to reduce bandwidth
2. **Caching** - Frequently requested chart data is cached
3. **Compression** - Data is compressed for faster transmission
4. **Throttling** - Real-time updates are throttled to prevent overwhelming clients

## Integration with TradingView Charting Library

This system is designed to integrate with the TradingView Charting Library:

1. **Data Feed** - Custom data feed adapter for real-time data
2. **Indicators** - Support for custom indicators
3. **Drawing Tools** - Full drawing tool integration
4. **UI Customization** - Customizable user interface

## Example Implementation

```javascript
// Initialize chart
const chart = new TradingView.Chart({
  container: document.getElementById('chart-container'),
  symbol: 'ETH/USDT',
  interval: '1h',
  datafeed: new Datafeed(),
  library_path: '/charting_library/'
});

// Update chart with new data
function updateChart(newData) {
  chart.series.addData(newData);
}
```