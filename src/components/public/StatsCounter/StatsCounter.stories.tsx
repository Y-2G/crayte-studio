import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { StatsCounter } from './StatsCounter';

const meta = {
  title: 'Public/StatsCounter',
  component: StatsCounter,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof StatsCounter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Verify stat labels
    await expect(canvas.getByText('プロジェクト')).toBeInTheDocument();
    await expect(canvas.getByText('リピート率')).toBeInTheDocument();
    await expect(canvas.getByText('業界経験')).toBeInTheDocument();
    // Verify section has proper aria-label
    const section = canvasElement.querySelector('[aria-label="制作実績統計"]');
    await expect(section).toBeInTheDocument();
  },
};

export const CustomStats: Story = {
  args: {
    stats: [
      { value: 500, suffix: '+', label: 'クライアント数' },
      { value: 99, suffix: '%', label: '顧客満足度' },
      { value: 15, suffix: 'Y+', label: '業界経験' },
      { value: 30, suffix: '+', label: 'チームメンバー' },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('クライアント数')).toBeInTheDocument();
    await expect(canvas.getByText('顧客満足度')).toBeInTheDocument();
    await expect(canvas.getByText('チームメンバー')).toBeInTheDocument();
  },
};

export const TwoStats: Story = {
  args: {
    stats: [
      { value: 200, suffix: '+', label: 'プロジェクト完了', gradient: 'linear-gradient(135deg, #FF1493, #9370DB)' },
      { value: 50, suffix: '+', label: 'パートナー企業', gradient: 'linear-gradient(135deg, #00BFFF, #FF1493)' },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('プロジェクト完了')).toBeInTheDocument();
    await expect(canvas.getByText('パートナー企業')).toBeInTheDocument();
  },
};
