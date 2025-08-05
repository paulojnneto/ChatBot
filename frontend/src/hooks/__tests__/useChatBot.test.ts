import { renderHook, act, waitFor } from '@testing-library/react';
import { useChatBot } from '@/hooks/useChatBot';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { api } from '@/services/api';
import type { Bot, Message } from '@/types/interfaces';

vi.mock('@/services/api', () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

describe('useChatBot', () => {
  const mockBots: Bot[] = [
    { id: 1, name: 'Bot One', context: 'Test context' },
  ];

  const mockMessages: Message[] = [
    { id: 1, userMessage: 'Hello', botResponse: 'Hi!', timestamp: '2023-10-01T12:00:00Z' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches bots on initialization', async () => {
    (api.get as any).mockResolvedValueOnce({ data: mockBots });

    const { result } = renderHook(() => useChatBot());

    await waitFor(() => expect(result.current.bots.length).toBe(1));
    expect(result.current.bots[0].name).toBe('Bot One');
  });

  it('fetches messages for a bot', async () => {
    (api.get as any).mockResolvedValueOnce({ data: [] });
    (api.get as any).mockResolvedValueOnce({ data: mockMessages });

    const { result } = renderHook(() => useChatBot());
    await act(() => result.current.fetchMessages(1));

    expect(api.get).toHaveBeenCalledWith('/Message/1');
    expect(result.current.history[0].userMessage).toBe('Hello');
  });


  it('sends a message and clears input', async () => {
    (api.post as any).mockResolvedValueOnce({});
    (api.get as any).mockResolvedValue({ data: mockMessages });

    const { result } = renderHook(() => useChatBot());

    act(() => {
      result.current.setMessage('Hello');
    });

    await act(() => result.current.handleSend(1));

    expect(api.post).toHaveBeenCalledWith('/Message', {
      userMessage: 'Hello',
    });
    expect(result.current.message).toBe('');
  });

  it('creates a bot and adds it to list', async () => {
    const newBot = { id: 2, name: 'Bot Two', context: 'New context' };
    (api.post as any).mockResolvedValueOnce({ data: newBot });

    const { result } = renderHook(() => useChatBot());

    const createdBot = await result.current.createBot('Bot Two', 'New context');

    expect(api.post).toHaveBeenCalledWith('/Bot', {
      name: 'Bot Two',
      context: 'New context',
    });

    expect(createdBot?.name).toBe('Bot Two');

    await waitFor(() => {
      expect(result.current.bots.some(bot => bot.id === 2)).toBeTruthy();
    });
  });
});
