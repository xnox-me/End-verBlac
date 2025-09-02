import React, { useState } from 'react';

const TradePanel = () => {
  const [tradeType, setTradeType] = useState('buy');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [total, setTotal] = useState('');

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    if (price) {
      setTotal((value * price).toFixed(2));
    }
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    setPrice(value);
    if (amount) {
      setTotal((amount * value).toFixed(2));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real implementation, this would submit the trade
    console.log({ tradeType, amount, price, total });
    alert(`${tradeType.toUpperCase()} order submitted: ${amount} at ${price}`);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Trade Panel</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-lg p-6">
          <div className="flex border-b border-slate-700 mb-4">
            <button
              className={`flex-1 py-2 font-medium ${
                tradeType === 'buy'
                  ? 'text-green-500 border-b-2 border-green-500'
                  : 'text-slate-400'
              }`}
              onClick={() => setTradeType('buy')}
            >
              Buy
            </button>
            <button
              className={`flex-1 py-2 font-medium ${
                tradeType === 'sell'
                  ? 'text-red-500 border-b-2 border-red-500'
                  : 'text-slate-400'
              }`}
              onClick={() => setTradeType('sell')}
            >
              Sell
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={handleAmountChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">
                  Price (USDT)
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={handlePriceChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">
                  Total (USDT)
                </label>
                <input
                  type="number"
                  value={total}
                  readOnly
                  className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>

              <button
                type="submit"
                className={`w-full py-3 rounded-md font-medium ${
                  tradeType === 'buy'
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {tradeType === 'buy' ? 'Buy' : 'Sell'}
              </button>
            </div>
          </form>
        </div>

        <div className="bg-slate-800 rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">Order Book</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Price (USDT)</span>
              <span className="text-slate-400">Amount</span>
              <span className="text-slate-400">Total</span>
            </div>
            
            {/* Sell orders */}
            <div className="space-y-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-red-400">3200.{5 - i}</span>
                  <span>1.{i + 1}</span>
                  <span>3200.{(5 - i) * (i + 1)}</span>
                </div>
              ))}
            </div>
            
            {/* Current price */}
            <div className="flex justify-between text-lg font-bold py-2 border-y border-slate-700">
              <span>3200.0</span>
              <span className="text-slate-400">$3200.00</span>
            </div>
            
            {/* Buy orders */}
            <div className="space-y-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-green-400">3199.{i}</span>
                  <span>1.{5 - i}</span>
                  <span>3199.{i * (5 - i)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradePanel;