import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MainLayout from '../index';
import { describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';

// Mock Outlet so it doesn’t try to render real routes
vi.mock('react-router-dom', async () => {
  const actual = await import('react-router-dom');
  return {
    ...actual,
    Outlet: () => <div data-testid="mock-outlet">Mock Outlet</div>,
  };
});

describe('MainLayout', () => {
  it('renders sidebar with menu items', () => {
    render(
      <MemoryRouter>
        <MainLayout />
      </MemoryRouter>,
    );

    // Check menu labels
    expect(screen.getByText('CORE & FUNDAMENTALS')).toBeInTheDocument();
    expect(screen.getByText('LOGIC')).toBeInTheDocument();
    expect(screen.getByText('WORKFLOW')).toBeInTheDocument();
  });

  it('collapses sidebar when toggle clicked', () => {
    render(
      <MemoryRouter>
        <MainLayout />
      </MemoryRouter>,
    );

    // Sider collapse button has role="button"
    const toggleBtn = screen.getByRole('button');
    fireEvent.click(toggleBtn);

    // The sider should now have collapsed class
    expect(toggleBtn.closest('.ant-layout-sider-collapsed')).toBeTruthy();
  });

  it('renders outlet content', () => {
    render(
      <MemoryRouter>
        <MainLayout />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('mock-outlet')).toBeInTheDocument();
  });
});
