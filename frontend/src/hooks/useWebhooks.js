import { useState, useEffect } from 'react';
import { webhookAPI } from '../utils/api';

export const useWebhooks = () => {
  const [webhooks, setWebhooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWebhooks = async () => {
    try {
      setLoading(true);
      const response = await webhookAPI.getWebhooks();
      setWebhooks(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createWebhook = async (webhookData) => {
    try {
      const response = await webhookAPI.createWebhook(webhookData);
      setWebhooks(prev => [...prev, response.webhook]);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateWebhook = async (id, webhookData) => {
    try {
      const response = await webhookAPI.updateWebhook(id, webhookData);
      setWebhooks(prev => 
        prev.map(webhook => 
          webhook.id === id ? { ...webhook, ...response.webhook } : webhook
        )
      );
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteWebhook = async (id) => {
    try {
      await webhookAPI.deleteWebhook(id);
      setWebhooks(prev => prev.filter(webhook => webhook.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const toggleWebhook = async (id) => {
    try {
      const webhook = webhooks.find(w => w.id === id);
      if (!webhook) return;
      
      const updatedWebhook = { ...webhook, active: !webhook.active };
      await updateWebhook(id, updatedWebhook);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchWebhooks();
  }, []);

  return {
    webhooks,
    loading,
    error,
    createWebhook,
    updateWebhook,
    deleteWebhook,
    toggleWebhook,
    refreshWebhooks: fetchWebhooks,
  };
};