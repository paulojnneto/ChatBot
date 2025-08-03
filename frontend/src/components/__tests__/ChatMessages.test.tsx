import { render, screen } from '@testing-library/react';
import { ChatMessages } from '../ChatMessages';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { Provider } from "@/components/ui/provider"

describe('ChatMessages', () => {
  const mockHistory = [
    { id: 1, userMessage: 'Hi', botResponse: 'Hello!' },
    { id: 2, userMessage: 'How are you?', botResponse: "I'm fine, thank you!" },
  ];

  it('renders all messages correctly', () => {
    const scrollRef = { current: null } as unknown as React.RefObject<HTMLDivElement>;

    render(
      <Provider>
        <ChatMessages history={mockHistory} scrollRef={scrollRef} />
      </Provider>
    );

    // Check that user and bot labels exist
    expect(screen.getAllByText('You:')).toHaveLength(2);
    expect(screen.getAllByText('Bot:')).toHaveLength(2);

    // Check that messages are displayed
    expect(screen.getByText('Hi')).toBeInTheDocument();
    expect(screen.getByText('Hello!')).toBeInTheDocument();
    expect(screen.getByText('How are you?')).toBeInTheDocument();
    expect(screen.getByText("I'm fine, thank you!")).toBeInTheDocument();
  });
});
