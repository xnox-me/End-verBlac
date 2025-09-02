import React, { useState } from 'react';

const WebhookManager = () => {
  const [webhooks, setWebhooks] = useState([
    {
      id: 1,
      name: 'Price Alert - ETH/USDT',
      url: 'https://example.com/webhook/eth-alert',
      event: 'price_crossing',
      pair: 'ETH/USDT',
      condition: 'above',
      value: '3200',
      active: true,
    },
    {
      id: 2,
      name: 'Trade Execution',
      url: 'https://example.com/webhook/trade-executed',
      event: 'trade_executed',
      pair: 'BTC/USDT',
      condition: '',
      value: '',
      active: false,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    event: 'price_crossing',
    pair: 'ETH/USDT',
    condition: 'above',
    value: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newWebhook = {
      id: webhooks.length + 1,
      ...formData,
      active: true,
    };
    setWebhooks([...webhooks, newWebhook]);
    setFormData({
      name: '',
      url: '',
      event: 'price_crossing',
      pair: 'ETH/USDT',
      condition: 'above',
      value: '',
    });
    setShowForm(false);
  };

  const toggleWebhook = (id) => {
    setWebhooks(
      webhooks.map((webhook) =>
        webhook.id === id ? { ...webhook, active: !webhook.active } : webhook
      )
    );
  };

  const deleteWebhook = (id) => {
    setWebhooks(webhooks.filter((webhook) => webhook.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Webhook Manager</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Add Webhook
        </button>
      </div>

      {showForm && (
        <div className="bg-slate-800 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-bold mb-4">Create New Webhook</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">
                  Webhook Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">
                  URL
                </label>
                <input
                  type="url"
                  name="url"
                  value={formData.url}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">
                  Event
                </label>
                <select
                  name="event"
                  value={formData.event}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="price_crossing">Price Crossing</option>
                  <option value="trade_executed">Trade Executed</option>
                  <option value="order_book">Order Book Change</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">
                  Trading Pair
                </label>
                <select
                  name="pair"
                  value={formData.pair}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>ETH/USDT</option>
                  <option>BTC/USDT</option>
                  <option>BNB/USDT</option>
                  <option>SOL/USDT</option>
                </select>
              </div>
              {formData.event === 'price_crossing' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">
                      Condition
                    </label>
                    <select
                      name="condition"
                      value={formData.condition}
                      onChange={handleInputChange}
                      className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="above">Above</option>
                      <option value="below">Below</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">
                      Price Value
                    </label>
                    <input
                      type="number"
                      name="value"
                      value={formData.value}
                      onChange={handleInputChange}
                      className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </>
              )}
            </div>
            <div className="flex space-x-2">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                Create Webhook
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-slate-800 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-slate-700">
          <thead className="bg-slate-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                Event
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                Pair
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                URL
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-slate-800 divide-y divide-slate-700">
            {webhooks.map((webhook) => (
              <tr key={webhook.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                  {webhook.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                  {webhook.event}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                  {webhook.pair}
                </td>
                <td className="px-6 py-4 text-sm text-slate-300 max-w-xs truncate">
                  {webhook.url}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      webhook.active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {webhook.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => toggleWebhook(webhook.id)}
                    className="text-blue-400 hover:text-blue-300 mr-3"
                  >
                    {webhook.active ? 'Disable' : 'Enable'}
                  </button>
                  <button
                    onClick={() => deleteWebhook(webhook.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WebhookManager;