import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Header } from './Header';

const meta = {
  title: 'Admin/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    sidebarCollapsed: false,
  },
};

export const SidebarCollapsed: Story = {
  args: {
    sidebarCollapsed: true,
  },
};
