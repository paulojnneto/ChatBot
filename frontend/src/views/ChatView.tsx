import { useEffect, useState } from 'react';
import { api } from '../services/api';

interface Bot {
  id: number;
  name: string;
  context: string;
}

interface Message {
  id: number;
  userMessage: string;
  botResponse: string;
  timestamp: string;
}

export const ChatView = () => {
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

  const handleSend = async () => {
    if (!selectedBotId || !message.trim()) return;
    setLoading(true);
    try {
      const res = await api.post('/Message', {
        botId: selectedBotId,
        userMessage: message
      });
      console.log({ res });
      setMessage('');
      fetchMessages(selectedBotId);
    } catch (err) {
      console.log({ err });

      alert('Erro ao enviar mensagem');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <h2>Chatbot</h2>

      <select
        onChange={(e) => {
          const botId = parseInt(e.target.value);
          setSelectedBotId(botId);
          fetchMessages(botId);
        }}
        value={selectedBotId || ''}
      >
        <option value="" disabled>Selecione um bot</option>
        {bots.map(bot => (
          <option key={bot.id} value={bot.id}>{bot.name}</option>
        ))}
      </select>

      <div style={{ margin: '20px 0', border: '1px solid #ccc', padding: 10 }}>
        {history.map((msg) => (
          <div key={msg.id} style={{ marginBottom: 12 }}>
            <strong>Você:</strong> {msg.userMessage} <br />
            <strong>Bot:</strong> {msg.botResponse}
          </div>
        ))}
      </div>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Digite sua pergunta..."
        style={{ width: '80%' }}
      />
      <button onClick={handleSend} disabled={loading}>
        {loading ? 'Enviando...' : 'Enviar'}
      </button>
    </div>
  );
};
