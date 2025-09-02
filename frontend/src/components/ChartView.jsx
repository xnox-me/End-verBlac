import React, { useEffect, useRef } from 'react';

const ChartView = ({ pair, timeframe }) => {
  const chartContainerRef = useRef(null);

  useEffect(() => {
    // In a real implementation, this would initialize the TradingView chart
    // For this example, we'll create a simple placeholder
    if (chartContainerRef.current) {
      chartContainerRef.current.innerHTML = `
        <div class="bg-slate-800 rounded-lg p-4 h-96 flex items-center justify-center">
          <div class="text-center">
            <div class="text-xl font-bold mb-2">${pair} Chart</div>
            <div class="text-slate-400">Timeframe: ${timeframe}</div>
            <div class="mt-4 text-slate-500">
              TradingView chart would be displayed here
            </div>
          </div>
        </div>
      `;
    }
  }, [pair, timeframe]);

  return (
    <div className="bg-slate-800 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">{pair}</h2>
        <div className="flex space-x-2">
          <button className="bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded text-sm">1m</button>
          <button className="bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded text-sm">5m</button>
          <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm">15m</button>
          <button className="bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded text-sm">1h</button>
          <button className="bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded text-sm">4h</button>
          <button className="bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded text-sm">1d</button>
        </div>
      </div>
      <div ref={chartContainerRef}></div>
    </div>
  );
};

export default ChartView;