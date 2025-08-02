import type { ChatMessagesProps } from '@/types/interfaces';
import { Box, Flex, Text, VStack } from '@chakra-ui/react';

export function ChatMessages({ history, scrollRef }: ChatMessagesProps) {
  return (
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
              <Text fontWeight="bold">Bot:</Text>
              <Text mt={2}>{msg.botResponse}</Text>
            </Box>
          </Flex>
        </VStack>
      ))}
      <div ref={scrollRef} />
    </VStack>
  );
}
