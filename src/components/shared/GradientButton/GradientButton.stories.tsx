import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { GradientButton } from './GradientButton';

const meta = {
  title: 'Shared/GradientButton',
  component: GradientButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['dark', 'light'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof GradientButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'お問い合わせ',
    href: '/contact',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link', { name: /お問い合わせ/ });
    await expect(link).toBeInTheDocument();
    await expect(link).toHaveAttribute('href', '/contact');
  },
};

export const Dark: Story = {
  args: {
    children: 'お問い合わせ',
    href: '/contact',
    variant: 'dark',
  },
};

export const Light: Story = {
  args: {
    children: '詳しく見る',
    href: '/services',
    variant: 'light',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link', { name: /詳しく見る/ });
    await expect(link).toHaveAttribute('href', '/services');
  },
};

export const Filled: Story = {
  args: {
    children: 'お問い合わせ',
    href: '/contact',
    filled: true,
  },
};

export const Small: Story = {
  args: {
    children: '小さいボタン',
    href: '#',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    children: '大きいボタン',
    href: '#',
    size: 'lg',
    filled: true,
  },
};

export const AllVariants: Story = {
  args: {} as Story['args'],
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
      <GradientButton href="#" variant="dark">Dark</GradientButton>
      <GradientButton href="#" variant="light">Light</GradientButton>
      <GradientButton href="#" variant="dark" filled>Dark Filled</GradientButton>
      <GradientButton href="#" variant="light" filled>Light Filled</GradientButton>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const links = canvas.getAllByRole('link');
    await expect(links).toHaveLength(4);
  },
};
