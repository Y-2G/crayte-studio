import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { Button } from './Button';

const meta = {
  title: 'Shared/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    onClick: fn(),
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'ghost', 'outline', 'outlineLight'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'ボタン',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'セカンダリ',
    variant: 'secondary',
  },
};

export const Danger: Story = {
  args: {
    children: '削除',
    variant: 'danger',
  },
};

export const Ghost: Story = {
  args: {
    children: 'ゴースト',
    variant: 'ghost',
  },
};

export const Outline: Story = {
  args: {
    children: 'アウトライン',
    variant: 'outline',
  },
};

export const OutlineLight: Story = {
  args: {
    children: 'アウトライン (Light)',
    variant: 'outlineLight',
  },
};

export const Small: Story = {
  args: {
    children: '小',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    children: '大',
    size: 'lg',
  },
};

export const Loading: Story = {
  args: {
    children: '送信中...',
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: '無効',
    disabled: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="outlineLight">OutlineLight</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};
