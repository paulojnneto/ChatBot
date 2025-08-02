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
          <Button onClick={onOpen} variant="ghost" colorPalette="teal" loading={creatingBot}>
            + New Bot
          </Button>
        </VStack>
      </Box>

      {/* Chat container */}
      <Flex flex="1" h="100vh" direction="column" bg="gray.900">
        <Box flex="1" overflowY="auto" p={4}>
          {selectedBotId ? (
            <VStack align="stretch">
              {history.map(msg => (
                <VStack key={msg.id} align="stretch">
                  <Flex justify="flex-end">
                    <Box p={3} bg="gray.600" maxW="70%" borderRadius="md" shadow="sm">
                      <Text fontWeight="bold">You:</Text>
                      <Text mt={2}>{msg.userMessage}</Text>
                    </Box>
                  </Flex>
                  <Flex justify="flex-start">
                    <Box p={3} bg="blue.700" maxW="70%" borderRadius="md" shadow="sm">
                      <Text fontWeight="bold" >Bot:</Text>
                      <Text mt={2}>{msg.botResponse}</Text>
                    </Box>
                  </Flex>
                </VStack>
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
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey && message.trim() && selectedBotId) {
                  e.preventDefault();
                  handleSend(selectedBotId);
                }
              }}
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
      {open && (
        <Box
          position="fixed"
          top="0"
          left="0"
          w="100vw"
          h="100vh"
          bg="blackAlpha.700"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex="999"
        >
          <Box bg="gray.800" p={6} borderRadius="md" width="90%" maxW="400px" color="white">
            <Text fontSize="xl" fontWeight="bold" mb={4}>Create a New Bot</Text>

            <Box mb={4}>
              <Text mb={1}>Name</Text>
              <Input
                placeholder="Bot name"
                value={newBotName}
                onChange={(e) => setNewBotName(e.target.value)}
                bg="white"
                color="black"
              />
            </Box>

            <Box mb={6}>
              <Text mb={1}>Context</Text>
              <Textarea
                placeholder='e.g. "You are a polite sales assistant"'
                value={newBotContext}
                onChange={(e) => setNewBotContext(e.target.value)}
                bg="white"
                color="black"
              />
            </Box>

            <Flex justify="flex-end" gap={2}>
              <Button variant="outline" colorPalette="red" onClick={onClose}>Cancel</Button>
              <Button
                colorPalette="teal"
                onClick={handleCreateBot}
                loading={creatingBot}
              >
                Create
              </Button>
            </Flex>
          </Box>
        </Box>
      )}

    </Flex>

  );
}
