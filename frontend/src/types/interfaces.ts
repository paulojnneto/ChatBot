
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

interface SidebarProps {
  bots: { id: number; name: string }[];
  selectedBotId: number | null;
  onSelectBot: (botId: number) => void;
  onCreate: () => void;
  creatingBot: boolean;
}

interface ChatMessagesProps {
  history: { id: number; userMessage: string; botResponse: string }[];
  scrollRef: React.RefObject<HTMLDivElement | null>;
}

interface MessageInputBarProps {
  message: string;
  setMessage: (value: string) => void;
  onSend: () => void;
  loading: boolean;
}

interface CreateBotModalProps {
  isOpen: boolean;
  onClose: () => void;
  newBotName: string;
  setNewBotName: (value: string) => void;
  newBotContext: string;
  setNewBotContext: (value: string) => void;
  handleCreateBot: () => void;
  creatingBot: boolean;
}

export type { Bot, Message, SidebarProps, ChatMessagesProps, MessageInputBarProps, CreateBotModalProps }