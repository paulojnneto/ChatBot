import { useChatBot } from '../hooks/useChatBot';

export const ChatView = () => {
  const {
    bots,
    selectedBotId,
    handleBotSelect,
    message,
    setMessage,
    history,
    handleSend,
    loading
  } = useChatBot();

  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <h2>Chatbot</h2>

      <select
        onChange={(e) => handleBotSelect(parseInt(e.target.value))}
        value={selectedBotId || ''}
        className='font-bold'
      >
        <option value="" disabled >Selecione um bot</option>
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
