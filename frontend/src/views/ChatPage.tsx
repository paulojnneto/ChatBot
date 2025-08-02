import {
  Box,
  Flex,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useRef, useEffect, useState } from 'react';
import { useChatBot } from '../hooks/useChatBot';
import { Sidebar } from '../components/Sidebar';
import { ChatMessages } from '../components/ChatMessages';
import { MessageInputBar } from '../components/MessageInputBar';
import { CreateBotModal } from '../components/CreateBotModal';

export default function ChatPage() {
  const {
    bots,
    history,
    message,
    setMessage,
    loading,
    creatingBot,
    fetchMessages,
    handleSend,
    createBot
  } = useChatBot();

  const [selectedBotId, setSelectedBotId] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { open, onOpen, onClose } = useDisclosure();
  const [newBotName, setNewBotName] = useState('');
  const [newBotContext, setNewBotContext] = useState('');

  const handleBotClick = (botId: number) => {
    setSelectedBotId(botId);
    fetchMessages(botId);
  };

  const handleCreateBot = async () => {
    const bot = await createBot(newBotName, newBotContext);
    if (bot) {
      onClose();
      setNewBotName('');
      setNewBotContext('');
      handleBotClick(bot.id);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <Flex w="100vw" h="100vh" bg="gray.900" color="white" overflow="hidden">
      <Sidebar
        bots={bots}
        onCreate={onOpen}
        selectedBotId={selectedBotId}
        onSelectBot={handleBotClick}
        creatingBot={creatingBot}
      />

      <Flex flex="1" h="100vh" direction="column" bg="gray.900">
        <Box flex="1" overflowY="auto" p={4}>
          {selectedBotId ? (
            <ChatMessages history={history} scrollRef={scrollRef} />
          ) : (
            <Flex align="center" justify="center" h="100%">
              <Text color="gray.500">Select a bot to start chatting</Text>
            </Flex>
          )}
        </Box>

        {selectedBotId && (
          <MessageInputBar
            message={message}
            setMessage={setMessage}
            loading={loading}
            onSend={() => selectedBotId && handleSend(selectedBotId)}
          />
        )}
      </Flex>

      <CreateBotModal
        isOpen={open}
        onClose={onClose}
        newBotName={newBotName}
        setNewBotName={setNewBotName}
        newBotContext={newBotContext}
        setNewBotContext={setNewBotContext}
        handleCreateBot={handleCreateBot}
        creatingBot={creatingBot}
      />
    </Flex>
  );
}
