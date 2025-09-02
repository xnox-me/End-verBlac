import React from 'react';
import { Link } from 'react-router-dom';
// Import theme configuration
import theme from '../config/theme';
import Logo from './Logo';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          {/* DODODEX Branding with Image */}
          <div className="flex justify-center items-center mb-6">
            <Logo size="lg" className="mr-4" />
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
              DODODEX Trading Platform
            </h1>
          </div>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
            Advanced charting platform for decentralized exchange trading with real-time data, webhook notifications, and AI-powered semantic search
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/chart" 
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-3 px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
            >
              Launch DODODEX Platform
            </Link>
            <a 
              href="#features" 
              className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-8 rounded-lg transition duration-300 ease-in-out shadow-md"
            >
              Learn More
            </a>
          </div>
        </div>

        <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-blue-500 transition duration-300 shadow-lg">
            <div className="text-blue-400 text-3xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-2">Advanced Charting</h3>
            <p className="text-slate-400">
              Professional-grade charting tools with multiple timeframes, technical indicators, and drawing tools.
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-green-500 transition duration-300 shadow-lg">
            <div className="text-green-400 text-3xl mb-4">⚡</div>
            <h3 className="text-xl font-bold mb-2">DEX Trading</h3>
            <p className="text-slate-400">
              Trade directly on decentralized exchanges with support for multiple protocols and tokens.
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-purple-500 transition duration-300 shadow-lg">
            <div className="text-purple-400 text-3xl mb-4">🧠</div>
            <h3 className="text-xl font-bold mb-2">AI-Powered Search</h3>
            <p className="text-slate-400">
              Semantic search capabilities powered by Weaviate Cloud for intelligent data discovery.
            </p>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700 mb-16 shadow-xl">
          <h2 className="text-2xl font-bold text-center mb-8">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="text-blue-400 mr-3 mt-1">✓</div>
              <div>
                <h4 className="font-bold mb-1">Multi-Chain Support</h4>
                <p className="text-slate-400 text-sm">
                  Trade across multiple blockchain networks including Ethereum, BSC, Polygon, and more.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="text-blue-400 mr-3 mt-1">✓</div>
              <div>
                <h4 className="font-bold mb-1">Real-Time Data</h4>
                <p className="text-slate-400 text-sm">
                  Live price updates and order book data with minimal latency.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="text-blue-400 mr-3 mt-1">✓</div>
              <div>
                <h4 className="font-bold mb-1">Custom Indicators</h4>
                <p className="text-slate-400 text-sm">
                  Create and use custom technical indicators for advanced analysis.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="text-blue-400 mr-3 mt-1">✓</div>
              <div>
                <h4 className="font-bold mb-1">Weaviate Integration</h4>
                <p className="text-slate-400 text-sm">
                  AI-powered semantic search across trading pairs, trades, and user data.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6">Get Started Today</h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-8">
            Join thousands of traders using our platform to analyze markets and execute trades on decentralized exchanges.
          </p>
          <Link 
            to="/chart" 
            className="inline-block bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-3 px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
          >
            Start Trading Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;