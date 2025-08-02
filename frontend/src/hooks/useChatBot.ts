import { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { Bot, Message } from '../types/interfaces';

export function useChatBot() {
  const [bots, setBots] = useState<Bot[]>([]);
  const [selectedBotId, setSelectedBotId] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get('/Bot').then(res => setBots(res.data));
  }, []);

  const fetchMessages = (botId: number) => {
    api.get(`/Message/${botId}`).then(res => setHistory(res.data));
  };

  const handleBotSelect = (botId: number) => {
    setSelectedBotId(botId);
    fetchMessages(botId);
  };

  const handleSend = async () => {
    if (!selectedBotId || !message.trim()) return;

    setLoading(true);
    try {
      await api.post('/Message', {
        botId: selectedBotId,
        userMessage: message
      });
      setMessage('');
      fetchMessages(selectedBotId);
    } catch (err) {
      console.error('Erro ao enviar mensagem:', err);
      alert('Erro ao enviar mensagem');
    } finally {
      setLoading(false);
    }
  };

  return {
    bots,
    selectedBotId,
    handleBotSelect,
    message,
    setMessage,
    history,
    handleSend,
    loading
  };
}
