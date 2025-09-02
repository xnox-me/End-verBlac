import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import ChartView from './components/ChartView';
import TradePanel from './components/TradePanel';
import WebhookManager from './components/WebhookManager';
import WeaviateSearch from './components/WeaviateSearch';
import About from './components/About';
import Contact from './components/Contact';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-900 text-slate-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chart" element={<ChartView />} />
          <Route path="/trade" element={<TradePanel />} />
          <Route path="/webhooks" element={<WebhookManager />} />
          <Route path="/weaviate-search" element={<WeaviateSearch />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;