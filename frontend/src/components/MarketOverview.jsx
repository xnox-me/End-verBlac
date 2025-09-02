import React from 'react';

const MarketOverview = () => {
  const markets = [
    { pair: 'ETH/USDT', price: '3200.50', change: '+2.5%', volume: '125.4M' },
    { pair: 'BTC/USDT', price: '84200.25', change: '-1.2%', volume: '2.1B' },
    { pair: 'BNB/USDT', price: '580.75', change: '+5.7%', volume: '89.2M' },
    { pair: 'SOL/USDT', price: '142.30', change: '+8.3%', volume: '456.7M' },
  ];

  return (
    <div className="bg-slate-800 rounded-lg p-4">
      <h2 className="text-lg font-bold mb-4">Market Overview</h2>
      <div className="space-y-3">
        {markets.map((market, index) => (
          <div key={index} className="flex justify-between items-center py-2 border-b border-slate-700 last:border-0">
            <div>
              <div className="font-medium">{market.pair}</div>
              <div className="text-sm text-slate-400">{market.volume}</div>
            </div>
            <div className="text-right">
              <div className="font-medium">${market.price}</div>
              <div className={`text-sm ${market.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                {market.change}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketOverview;