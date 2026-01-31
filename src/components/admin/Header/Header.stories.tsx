import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Verify site link
    await expect(canvas.getByText('CRAYTE STUDIO')).toBeInTheDocument();
    await expect(canvas.getByText('サイトを表示')).toBeInTheDocument();
    // Verify notification button
    const notificationBtn = canvas.getByRole('button', { name: '通知' });
    await expect(notificationBtn).toBeInTheDocument();
    // Verify notification badge
    await expect(canvas.getByText('3')).toBeInTheDocument();
    // Verify username
    await expect(canvas.getByText('管理者')).toBeInTheDocument();
  },
};

export const SidebarCollapsed: Story = {
  args: {
    sidebarCollapsed: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('CRAYTE STUDIO')).toBeInTheDocument();
    await expect(canvas.getByText('管理者')).toBeInTheDocument();
  },
};
