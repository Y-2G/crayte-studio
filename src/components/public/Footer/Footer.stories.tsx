import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { Footer } from './Footer';

const meta = {
  title: 'Public/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Verify branding
    await expect(canvas.getByText('Crayte Studio')).toBeInTheDocument();
    // Verify contact info
    await expect(canvas.getByText('info@crayte-studio.com')).toBeInTheDocument();
    await expect(canvas.getByText('03-1234-5678')).toBeInTheDocument();
    await expect(canvas.getByText('東京都渋谷区○○ 1-2-3')).toBeInTheDocument();
    // Verify navigation sections
    await expect(canvas.getByText('サービス')).toBeInTheDocument();
    await expect(canvas.getByText('会社情報')).toBeInTheDocument();
    await expect(canvas.getByText('リソース')).toBeInTheDocument();
    // Verify service links
    await expect(canvas.getByText('Web制作')).toBeInTheDocument();
    await expect(canvas.getByText('イベント企画')).toBeInTheDocument();
    // Verify legal links
    await expect(canvas.getByText('プライバシーポリシー')).toBeInTheDocument();
    await expect(canvas.getByText('利用規約')).toBeInTheDocument();
    // Verify copyright
    const copyright = canvas.getByText(/Crayte Studio\. All rights reserved\./);
    await expect(copyright).toBeInTheDocument();
    // Verify footer navigation landmark
    const nav = canvas.getByRole('navigation', { name: 'フッターナビゲーション' });
    await expect(nav).toBeInTheDocument();
  },
};
