import { useChatBot } from '../hooks/useChatBot';
import { Button } from "@chakra-ui/react"
import { GoArrowUp } from "react-icons/go";


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
      <Button loading={loading} onClick={handleSend} colorPalette="green" variant="solid">
        <GoArrowUp /> Send
      </Button>
    </div>
  );
};
