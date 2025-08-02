
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

export type { Bot, Message }