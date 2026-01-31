import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { StatsCounter } from './StatsCounter';

const meta = {
  title: 'Public/StatsCounter',
  component: StatsCounter,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof StatsCounter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomStats: Story = {
  args: {
    stats: [
      { value: 500, suffix: '+', label: 'クライアント数' },
      { value: 99, suffix: '%', label: '顧客満足度' },
      { value: 15, suffix: 'Y+', label: '業界経験' },
      { value: 30, suffix: '+', label: 'チームメンバー' },
    ],
  },
};

export const TwoStats: Story = {
  args: {
    stats: [
      { value: 200, suffix: '+', label: 'プロジェクト完了', gradient: 'linear-gradient(135deg, #FF1493, #9370DB)' },
      { value: 50, suffix: '+', label: 'パートナー企業', gradient: 'linear-gradient(135deg, #00BFFF, #FF1493)' },
    ],
  },
};
