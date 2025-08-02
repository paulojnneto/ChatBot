import type { CreateBotModalProps } from '@/types/interfaces';
import { Box, Button, Flex, Input, Text, Textarea } from '@chakra-ui/react';

export function CreateBotModal({
  isOpen,
  onClose,
  newBotName,
  setNewBotName,
  newBotContext,
  setNewBotContext,
  handleCreateBot,
  creatingBot
}: CreateBotModalProps) {
  if (!isOpen) return null;

  return (
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
          <Button colorPalette="teal" onClick={handleCreateBot} loading={creatingBot}>
            Create
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}
