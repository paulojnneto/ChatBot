import type { MessageInputBarProps } from '@/types/interfaces';
import { Box, Button, Flex, Input } from '@chakra-ui/react';

export function MessageInputBar({ message, setMessage, onSend, loading }: MessageInputBarProps) {
  return (
    <Box p={4} bg="gray.800" borderTop="1px solid #2D3748">
      <Flex gap={2}>
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          bg="white"
          color="black"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && message.trim()) {
              e.preventDefault();
              onSend();
            }
          }}
        />
        <Button onClick={onSend} loading={loading} colorScheme="teal">
          Send
        </Button>
      </Flex>
    </Box>
  );
}