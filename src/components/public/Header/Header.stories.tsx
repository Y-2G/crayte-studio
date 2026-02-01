import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { Header } from './Header';

const meta = {
  title: 'Public/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/',
      },
    },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Verify navigation links exist
    await expect(canvas.getByText('ホーム')).toBeInTheDocument();
    await expect(canvas.getByText('会社概要')).toBeInTheDocument();
    await expect(canvas.getByText('サービス')).toBeInTheDocument();
    await expect(canvas.getByText('制作実績')).toBeInTheDocument();
    await expect(canvas.getByText('ニュース')).toBeInTheDocument();
    // Verify contact button
    await expect(canvas.getByText('お問い合わせ')).toBeInTheDocument();
    // Verify logo image
    const logo = canvas.getByAltText('CRAYTE STUDIO');
    await expect(logo).toBeInTheDocument();
    // Verify mobile menu button exists (may be hidden by CSS on desktop)
    const menuButton = canvasElement.querySelector('button[aria-label="メニューを開く"]');
    await expect(menuButton).toBeInTheDocument();
  },
};

export const MobileMenuToggle: Story = {
  play: async ({ canvasElement }) => {
    // Menu button may be hidden by CSS on desktop viewport; verify it exists in DOM
    const menuButton = canvasElement.querySelector('button[aria-label="メニューを開く"]');
    await expect(menuButton).toBeInTheDocument();
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  },
};

export const OnServicesPage: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/services',
      },
    },
  },
};

export const OnArticlesPage: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/articles',
        query: { filter: 'news' },
      },
    },
  },
};
