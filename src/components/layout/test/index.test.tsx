import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MainLayout from '../index';
import { it, expect } from 'vitest';
import '@testing-library/jest-dom';

it('renders submenu items under WORKFLOW when expanded', async () => {
  render(
    <MemoryRouter>
      <MainLayout />
    </MemoryRouter>,
  );
  const workflowMenu = screen.getByText('WORKFLOW');
  fireEvent.click(workflowMenu);
  expect(await screen.findByText('Common')).toBeInTheDocument();
  expect(screen.getByText('Practice')).toBeInTheDocument();
  expect(screen.getByText('Project')).toBeInTheDocument();
});

it('has CORE & FUNDAMENTALS as default selected menu item', () => {
  render(
    <MemoryRouter>
      <MainLayout />
    </MemoryRouter>,
  );
  const coreMenu = screen.getByText('CORE & FUNDAMENTALS');
  expect(coreMenu.closest('.ant-menu-item-selected')).toBeTruthy();
});

it('sidebar has width 300px', () => {
  render(
    <MemoryRouter>
      <MainLayout />
    </MemoryRouter>,
  );
  const sider = document.querySelector('.ant-layout-sider');
  expect(sider).toHaveStyle({ width: '300px' });
});

it('renders logo div in sidebar', () => {
  const { container } = render(
    <MemoryRouter>
      <MainLayout />
    </MemoryRouter>,
  );
  expect(container.querySelector('.demo-logo-vertical')).toBeInTheDocument();
});

it('renders header and content areas', () => {
  render(
    <MemoryRouter>
      <MainLayout />
    </MemoryRouter>,
  );
  expect(document.querySelector('.ant-layout-header')).toBeInTheDocument();
  expect(document.querySelector('.main-layout-content')).toBeInTheDocument();
});
