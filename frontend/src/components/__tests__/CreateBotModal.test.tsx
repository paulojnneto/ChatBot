import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CreateBotModal } from '../CreateBotModal';
import { Provider } from "@/components/ui/provider"

describe('<CreateBotModal />', () => {
  const setup = (propsOverrides = {}) => {
    const defaultProps = {
      isOpen: true,
      onClose: vi.fn(),
      newBotName: 'Test Bot',
      setNewBotName: vi.fn(),
      newBotContext: 'Test context',
      setNewBotContext: vi.fn(),
      handleCreateBot: vi.fn(),
      creatingBot: false,
    };

    render(
      <Provider>
        <CreateBotModal {...defaultProps} {...propsOverrides} />
      </Provider>
    );

    return { props: { ...defaultProps, ...propsOverrides } };
  };

  it('does not render when isOpen is false', () => {
    render(
      <Provider>
        <CreateBotModal
          isOpen={false}
          onClose={vi.fn()}
          newBotName=""
          setNewBotName={vi.fn()}
          newBotContext=""
          setNewBotContext={vi.fn()}
          handleCreateBot={vi.fn()}
          creatingBot={false}
        />
      </Provider>
    );

    expect(screen.queryByText('Create a New Bot')).not.toBeInTheDocument();
  });

  it('renders modal fields correctly', () => {
    setup();

    expect(screen.getByText('Create a New Bot')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Bot name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/you are a polite sales assistant/i)).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Create')).toBeInTheDocument();
  });

  it('triggers onClose when Cancel is clicked', () => {
    const onClose = vi.fn();
    setup({ onClose });

    fireEvent.click(screen.getByText('Cancel'));
    expect(onClose).toHaveBeenCalled();
  });

  it('triggers handleCreateBot when Create is clicked', () => {
    const handleCreateBot = vi.fn();
    setup({ handleCreateBot });

    fireEvent.click(screen.getByText('Create'));
    expect(handleCreateBot).toHaveBeenCalled();
  });

  it('updates bot name and context on change', () => {
    const setNewBotName = vi.fn();
    const setNewBotContext = vi.fn();

    setup({ setNewBotName, setNewBotContext });

    fireEvent.change(screen.getByPlaceholderText('Bot name'), {
      target: { value: 'Updated Name' },
    });

    fireEvent.change(screen.getByPlaceholderText(/you are a polite sales assistant/i), {
      target: { value: 'Updated Context' },
    });

    expect(setNewBotName).toHaveBeenCalledWith('Updated Name');
    expect(setNewBotContext).toHaveBeenCalledWith('Updated Context');
  });
});
