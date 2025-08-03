import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MessageInputBar } from '../MessageInputBar';
import { Provider } from "@/components/ui/provider"

describe('MessageInputBar', () => {
  const renderComponent = (propsOverride = {}) => {
    const defaultProps = {
      message: '',
      setMessage: vi.fn(),
      onSend: vi.fn(),
      loading: false,
    };

    return render(
      <Provider>
        <MessageInputBar {...defaultProps} {...propsOverride} />
      </Provider>
    );
  };

  it('renders the input and button', () => {
    renderComponent();

    expect(screen.getByPlaceholderText(/type your message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
  });

  it('calls setMessage when typing', () => {
    const setMessage = vi.fn();
    renderComponent({ setMessage });

    const input = screen.getByPlaceholderText(/type your message/i);
    fireEvent.change(input, { target: { value: 'Hello' } });

    expect(setMessage).toHaveBeenCalledWith('Hello');
  });

  it('calls onSend when clicking send button', () => {
    const onSend = vi.fn();
    renderComponent({ onSend });

    const button = screen.getByRole('button', { name: /send/i });
    fireEvent.click(button);

    expect(onSend).toHaveBeenCalled();
  });

  it('calls onSend when pressing Enter', () => {
    const onSend = vi.fn();
    const setMessage = vi.fn();
    renderComponent({
      onSend,
      message: 'test message',
      setMessage,
    });

    const input = screen.getByPlaceholderText(/type your message/i);
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });

    expect(onSend).toHaveBeenCalled();
  });

  it('does not call onSend if message is empty on Enter', () => {
    const onSend = vi.fn();
    renderComponent({
      onSend,
      message: '',
    });

    const input = screen.getByPlaceholderText(/type your message/i);
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });

    expect(onSend).not.toHaveBeenCalled();
  });
});
