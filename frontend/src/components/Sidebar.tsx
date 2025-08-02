import type { SidebarProps } from '@/types/interfaces';
import { Box, Button, VStack } from '@chakra-ui/react';

export function Sidebar({ bots, selectedBotId, onSelectBot, onCreate, creatingBot }: SidebarProps) {
  return (
    <Box w="200px" h="100vh" bg="gray.800" p={4} overflowY="auto" flexShrink={0}>
      <VStack align="stretch">
        {bots.map(bot => (
          <Button
            key={bot.id}
            variant={selectedBotId === bot.id ? 'solid' : 'outline'}
            colorPalette="teal"
            onClick={() => onSelectBot(bot.id)}
            whiteSpace="normal"
          >
            {bot.name}
          </Button>
        ))}
        <Button onClick={onCreate} variant="ghost" colorPalette="teal" loading={creatingBot}>
          + New Bot
        </Button>
      </VStack>
    </Box>
  );
}