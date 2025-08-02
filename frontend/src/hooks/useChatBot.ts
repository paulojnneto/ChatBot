import { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { Bot, Message } from '../types/interfaces';

export function useChatBot() {
  const [bots, setBots] = useState<Bot[]>([]);
  const [history, setHistory] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [creatingBot, setCreatingBot] = useState(false);

  // Load all existing bots on initialization
  useEffect(() => {
    fetchBots();
  }, []);

  // Fetch all bots from the API
  const fetchBots = async () => {
    try {
      const res = await api.get('/Bot');
      setBots(res.data);
    } catch (err) {
      console.error('Failed to fetch bots:', err);
    }
  };

  // Fetch chat history for a given bot
  const fetchMessages = async (botId: number) => {
    try {
      const res = await api.get(`/Message/${botId}`);
      setHistory(res.data);
    } catch (err) {
      console.error('Failed to fetch messages:', err);
    }
  };

  // Send a message to the given bot
  const handleSend = async (botId: number) => {
    if (!botId || !message.trim()) return;

    setLoading(true);
    try {
      await api.post('/Message', {
        botId,
        userMessage: message
      });
      setMessage('');
      fetchMessages(botId);
    } catch (err) {
      console.error('Failed to send message:', err);
      alert('Error while sending message');
    } finally {
      setLoading(false);
    }
  };

  // Create a new chatbot
  const createBot = async (name: string, context: string): Promise<Bot | null> => {
    if (!name.trim() || !context.trim()) return null;

    setCreatingBot(true);
    try {
      const res = await api.post('/Bot', { name, context });
      const newBot = res.data;
      setBots(prev => [...prev, newBot]);
      return newBot;
    } catch (err) {
      console.error('Failed to create bot:', err);
      alert('Error while creating bot');
      return null;
    } finally {
      setCreatingBot(false);
    }
  };

  return {
    bots,
    history,
    message,
    setMessage,
    loading,
    creatingBot,
    fetchBots,
    fetchMessages,
    handleSend,
    createBot
  };
}
