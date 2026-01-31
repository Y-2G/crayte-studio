import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within, userEvent, fn } from 'storybook/test';
import { Sidebar } from './Sidebar';

const meta = {
  title: 'Admin/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/admin',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ height: '100vh' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    onToggle: fn(),
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    collapsed: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Verify logo
    await expect(canvas.getByText('CRAYTE STUDIO')).toBeInTheDocument();
    // Verify menu items
    await expect(canvas.getByText('ダッシュボード')).toBeInTheDocument();
    await expect(canvas.getByText('投稿')).toBeInTheDocument();
    await expect(canvas.getByText('固定ページ')).toBeInTheDocument();
    await expect(canvas.getByText('メディア')).toBeInTheDocument();
    await expect(canvas.getByText('制作実績')).toBeInTheDocument();
    await expect(canvas.getByText('設定')).toBeInTheDocument();
    // Verify toggle button
    const toggleBtn = canvas.getByRole('button', { name: 'メニューを折りたたむ' });
    await expect(toggleBtn).toBeInTheDocument();
  },
};

export const Collapsed: Story = {
  args: {
    collapsed: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Logo should NOT be visible when collapsed
    const logos = canvasElement.querySelectorAll('h1');
    await expect(logos.length).toBe(0);
    // Toggle button should show expand label
    const toggleBtn = canvas.getByRole('button', { name: 'メニューを展開' });
    await expect(toggleBtn).toBeInTheDocument();
  },
};

export const PostsActive: Story = {
  args: {
    collapsed: false,
  },
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/admin/posts',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('投稿')).toBeInTheDocument();
  },
};

export const WorksActive: Story = {
  args: {
    collapsed: false,
  },
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/admin/works',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('制作実績')).toBeInTheDocument();
  },
};

export const SettingsActive: Story = {
  args: {
    collapsed: false,
  },
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/admin/settings',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('設定')).toBeInTheDocument();
  },
};

export const ToggleInteraction: Story = {
  args: {
    collapsed: false,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const toggleBtn = canvas.getByRole('button', { name: 'メニューを折りたたむ' });
    await userEvent.click(toggleBtn);
    await expect(args.onToggle).toHaveBeenCalledOnce();
  },
};
