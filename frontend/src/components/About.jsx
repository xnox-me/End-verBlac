import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">About DEX Terminal Clone (DTC)</h1>
      
      <div className="bg-slate-800 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
        <p className="text-slate-300 mb-4">
          We aim to democratize access to professional-grade trading tools by providing a powerful, 
          open-source platform that combines advanced charting capabilities with decentralized exchange trading.
        </p>
        <p className="text-slate-300">
          Our platform bridges the gap between traditional finance tools and the decentralized finance ecosystem, 
          enabling traders to make informed decisions with real-time data and sophisticated analysis tools.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-slate-800 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-3 text-blue-400">Key Features</h3>
          <ul className="space-y-2 text-slate-300">
            <li className="flex items-start">
              <span className="text-green-400 mr-2">✓</span>
              <span>Real-time charting with professional interface</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-400 mr-2">✓</span>
              <span>Multi-chain DEX trading support</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-400 mr-2">✓</span>
              <span>Custom webhook notifications</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-400 mr-2">✓</span>
              <span>Technical analysis indicators</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-400 mr-2">✓</span>
              <span>Portfolio tracking and performance analytics</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-slate-800 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-3 text-blue-400">Technology Stack</h3>
          <ul className="space-y-2 text-slate-300">
            <li className="flex items-start">
              <span className="text-cyan-400 mr-2">•</span>
              <span>Frontend: React, Vite, Tailwind CSS</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-400 mr-2">•</span>
              <span>Backend: Node.js, Express, MongoDB</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-400 mr-2">•</span>
              <span>Blockchain: Web3.js, Ethers.js</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-400 mr-2">•</span>
              <span>Real-time: Socket.IO</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-400 mr-2">•</span>
              <span>Charting: Professional Charting Library</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="bg-slate-800 rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4 text-blue-400">Open Source</h3>
        <p className="text-slate-300 mb-4">
          This project is open source and available on GitHub. We welcome contributions from the community 
          to help improve and expand the platform's capabilities.
        </p>
        <p className="text-slate-300">
          Whether you're a developer looking to contribute code, a trader with feature suggestions, 
          or a designer wanting to improve the UI/UX, we'd love to have you join our community.
        </p>
      </div>
    </div>
  );
};

export default About;