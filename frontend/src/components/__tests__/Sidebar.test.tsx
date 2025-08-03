import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Sidebar } from '../Sidebar';
import { Provider } from "@/components/ui/provider"

describe('Sidebar', () => {
  const bots = [
    { id: 1, name: 'Bot One' },
    { id: 2, name: 'Bot Two' },
  ];

  const renderComponent = (selectedBotId: number | null = null) =>
    render(
      <Provider>
        <Sidebar
          bots={bots}
          selectedBotId={selectedBotId}
          onSelectBot={() => { }}
          onCreate={() => { }}
          creatingBot={false}
        />
      </Provider>
    );

  it('renders all bots', () => {
    renderComponent();
    expect(screen.getByText('Bot One')).toBeInTheDocument();
    expect(screen.getByText('Bot Two')).toBeInTheDocument();
  });

  it('highlights the selected bot visually by comparing button background color', () => {
    renderComponent(2);

    const selectedButton = screen.getByText('Bot Two');
    expect(selectedButton).toHaveAttribute('data-selected', 'true');

    const otherButton = screen.getByText('Bot One');
    expect(otherButton).toHaveAttribute('data-selected', 'false');

  });
});
