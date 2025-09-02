import React, { useState } from 'react';
import axios from 'axios';

const WeaviateSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchType, setSearchType] = useState('trading-pairs');

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setSearchResults([]);
    
    try {
      let endpoint = '';
      if (searchType === 'trading-pairs') {
        endpoint = '/api/weaviate/trading-pairs/semantic';
      } else if (searchType === 'trades') {
        endpoint = '/api/weaviate/trades';
      } else if (searchType === 'users') {
        endpoint = '/api/weaviate/users';
      }
      
      const response = await axios.get(endpoint, {
        params: { query: searchQuery, limit: 10 }
      });
      
      setSearchResults(response.data);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const renderResults = () => {
    if (searchResults.length === 0) return null;
    
    if (searchType === 'trading-pairs') {
      return (
        <div className="mt-4 space-y-3">
          <h3 className="text-lg font-semibold">Trading Pairs</h3>
          {searchResults.map((pair, index) => (
            <div key={index} className="p-3 bg-slate-800 rounded-lg border border-slate-700">
              <div className="font-medium">{pair.symbol}</div>
              <div className="text-sm text-slate-400">
                {pair.baseAsset}/{pair.quoteAsset} on {pair.chain}
              </div>
              <div className="text-sm">
                Price: {pair.price} | 24h Volume: {pair.volume24h}
              </div>
            </div>
          ))}
        </div>
      );
    } else if (searchType === 'trades') {
      return (
        <div className="mt-4 space-y-3">
          <h3 className="text-lg font-semibold">Trades</h3>
          {searchResults.map((trade, index) => (
            <div key={index} className="p-3 bg-slate-800 rounded-lg border border-slate-700">
              <div className="font-medium">{trade.tradingPair}</div>
              <div className="text-sm">
                {trade.type}: {trade.amount} @ {trade.price}
              </div>
              <div className="text-sm text-slate-400">
                Status: {trade.status} | {new Date(trade.timestamp).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      );
    } else if (searchType === 'users') {
      return (
        <div className="mt-4 space-y-3">
          <h3 className="text-lg font-semibold">Users</h3>
          {searchResults.map((user, index) => (
            <div key={index} className="p-3 bg-slate-800 rounded-lg border border-slate-700">
              <div className="font-medium">{user.username}</div>
              <div className="text-sm text-slate-400">{user.email}</div>
              <div className="text-sm">
                Portfolio Value: {user.portfolioValue} | Joined: {new Date(user.joinDate).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
        Weaviate Semantic Search
      </h2>
      
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 shadow-lg">
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="bg-slate-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="trading-pairs">Trading Pairs</option>
            <option value="trades">Trades</option>
            <option value="users">Users</option>
          </select>
          
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter search query..."
            className="flex-grow bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          
          <button
            onClick={handleSearch}
            disabled={loading}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
        
        {renderResults()}
        
        {searchResults.length === 0 && !loading && searchQuery && (
          <div className="text-center text-slate-400 mt-4">
            No results found for "{searchQuery}"
          </div>
        )}
      </div>
    </div>
  );
};

export default WeaviateSearch;