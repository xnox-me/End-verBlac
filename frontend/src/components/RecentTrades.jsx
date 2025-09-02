import React from 'react';

const RecentTrades = () => {
  const trades = [
    { id: 1, pair: 'ETH/USDT', type: 'buy', price: '3200.50', amount: '1.25', time: '12:45:23' },
    { id: 2, pair: 'BTC/USDT', type: 'sell', price: '84200.25', amount: '0.05', time: '12:42:11' },
    { id: 3, pair: 'BNB/USDT', type: 'buy', price: '580.75', amount: '3.42', time: '12:38:45' },
    { id: 4, pair: 'SOL/USDT', type: 'sell', price: '142.30', amount: '12.5', time: '12:35:17' },
    { id: 5, pair: 'ETH/USDT', type: 'buy', price: '3198.20', amount: '0.75', time: '12:32:56' },
  ];

  return (
    <div className="bg-slate-800 rounded-lg p-4">
      <h2 className="text-lg font-bold mb-4">Recent Trades</h2>
      <div className="space-y-2">
        <div className="grid grid-cols-4 text-xs text-slate-400 px-2">
          <div>Pair</div>
          <div>Price</div>
          <div>Amount</div>
          <div className="text-right">Time</div>
        </div>
        {trades.map((trade) => (
          <div key={trade.id} className="grid grid-cols-4 text-sm px-2 py-1 hover:bg-slate-700 rounded">
            <div className="font-medium">{trade.pair}</div>
            <div className={trade.type === 'buy' ? 'text-green-500' : 'text-red-500'}>
              {trade.price}
            </div>
            <div>{trade.amount}</div>
            <div className="text-right text-slate-400">{trade.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTrades;