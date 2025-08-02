import {
  Box,
  Button,
  Flex,
  Input,
  Text,
  Textarea,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { useRef, useEffect, useState } from 'react';
import { useChatBot } from '../hooks/useChatBot';

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

  const { isOpen, onOpen, onClose } = useDisclosure();
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

      {/* Sidebar with independent scroll */}
      <Box
        w="200px"
        h="100vh"
        bg="gray.800"
        p={4}
        overflowY="auto"
        flexShrink={0}
      >
        <VStack align="stretch">
          {bots.map(bot => (
            <Button
              key={bot.id}
              variant={selectedBotId === bot.id ? 'solid' : 'outline'}
              colorPalette="teal"
              onClick={() => handleBotClick(bot.id)}
              whiteSpace="normal"
            >
              {bot.name}
            </Button>
          ))}
          <Button variant="ghost" colorPalette="teal" onClick={onOpen} loading={creatingBot}>
            + New Bot
          </Button>
        </VStack>
      </Box>

      {/* Chat container */}
      <Flex flex="1" h="100vh" direction="column" bg="gray.900">
        {/* Chat messages (scrollable) */}
        <Box flex="1" overflowY="auto" p={4}>
          {selectedBotId ? (
            <VStack align="stretch">
              {history.map(msg => (
                <Box key={msg.id} p={3} bg="gray.700" borderRadius="md" shadow="sm">
                  <Text fontWeight="bold">You:</Text>
                  <Text>{msg.userMessage}</Text>
                  <Text fontWeight="bold" mt={2}>Bot:</Text>
                  <Text>{msg.botResponse}</Text>
                </Box>
              ))}
              <div ref={scrollRef} />
            </VStack>
          ) : (
            <Flex align="center" justify="center" h="100%">
              <Text color="gray.500">Select a bot to start chatting</Text>
            </Flex>
          )}
        </Box>

        {/* Input bar fixed at bottom */}
        <Box p={4} bg="gray.800" borderTop="1px solid #2D3748">
          <Flex gap={2}>
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              bg="white"
              color="black"
            />
            <Button
              onClick={() => selectedBotId && handleSend(selectedBotId)}
              loading={loading}
              colorScheme="teal"
            >
              Send
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}
