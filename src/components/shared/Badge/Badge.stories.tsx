import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Badge } from './Badge';

const meta = {
  title: 'Shared/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'デフォルト',
    variant: 'default',
    size: 'md',
  },
};

export const Success: Story = {
  args: {
    children: '公開中',
    variant: 'success',
  },
};

export const Warning: Story = {
  args: {
    children: '保留中',
    variant: 'warning',
  },
};

export const Error: Story = {
  args: {
    children: 'エラー',
    variant: 'error',
  },
};

export const Info: Story = {
  args: {
    children: 'お知らせ',
    variant: 'info',
  },
};

export const Small: Story = {
  args: {
    children: '小',
    size: 'sm',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Badge variant="default">デフォルト</Badge>
      <Badge variant="success">成功</Badge>
      <Badge variant="warning">警告</Badge>
      <Badge variant="error">エラー</Badge>
      <Badge variant="info">情報</Badge>
    </div>
  ),
};
