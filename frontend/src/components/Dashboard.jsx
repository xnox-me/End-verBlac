import React, { useState, useEffect } from 'react';
import ChartView from './ChartView';
import MarketOverview from './MarketOverview';
import RecentTrades from './RecentTrades';

const Dashboard = () => {
  const [selectedPair, setSelectedPair] = useState('ETH/USDT');
  const [timeframe, setTimeframe] = useState('1h');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Trading Dashboard</h1>
        <div className="flex space-x-2">
          <select 
            className="bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm"
            value={selectedPair}
            onChange={(e) => setSelectedPair(e.target.value)}
          >
            <option>ETH/USDT</option>
            <option>BTC/USDT</option>
            <option>BNB/USDT</option>
            <option>SOL/USDT</option>
          </select>
          <select 
            className="bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
          >
            <option value="1m">1m</option>
            <option value="5m">5m</option>
            <option value="15m">15m</option>
            <option value="1h">1h</option>
            <option value="4h">4h</option>
            <option value="1d">1d</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartView pair={selectedPair} timeframe={timeframe} />
        </div>
        <div className="space-y-6">
          <MarketOverview />
          <RecentTrades />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;