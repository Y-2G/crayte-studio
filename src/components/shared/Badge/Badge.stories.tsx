import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('デフォルト')).toBeInTheDocument();
  },
};

export const Success: Story = {
  args: {
    children: '公開中',
    variant: 'success',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('公開中')).toBeInTheDocument();
  },
};

export const Warning: Story = {
  args: {
    children: '保留中',
    variant: 'warning',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('保留中')).toBeInTheDocument();
  },
};

export const Error: Story = {
  args: {
    children: 'エラー',
    variant: 'error',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('エラー')).toBeInTheDocument();
  },
};

export const Info: Story = {
  args: {
    children: 'お知らせ',
    variant: 'info',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('お知らせ')).toBeInTheDocument();
  },
};

export const Small: Story = {
  args: {
    children: '小',
    size: 'sm',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('小')).toBeInTheDocument();
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('デフォルト')).toBeInTheDocument();
    await expect(canvas.getByText('成功')).toBeInTheDocument();
    await expect(canvas.getByText('警告')).toBeInTheDocument();
    await expect(canvas.getByText('エラー')).toBeInTheDocument();
    await expect(canvas.getByText('情報')).toBeInTheDocument();
  },
};
