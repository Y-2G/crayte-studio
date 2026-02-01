import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { OptimizedImage } from './OptimizedImage';

const meta = {
  title: 'Shared/OptimizedImage',
  component: OptimizedImage,
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text' },
    fallbackSrc: { control: 'text' },
    alt: { control: 'text' },
    width: { control: 'number' },
    height: { control: 'number' },
  },
} satisfies Meta<typeof OptimizedImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1746289271913-12e4d839c045?w=400&q=80',
    alt: 'サンプル画像',
    width: 400,
    height: 300,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const img = canvas.getByRole('img', { name: 'サンプル画像' });
    await expect(img).toBeInTheDocument();
  },
};

export const WithFallback: Story = {
  args: {
    src: undefined,
    alt: 'フォールバック画像',
    width: 400,
    height: 300,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const img = canvas.getByRole('img', { name: 'フォールバック画像' });
    await expect(img).toBeInTheDocument();
  },
};

export const InvalidSrc: Story = {
  args: {
    src: '/images/this-does-not-exist.png',
    alt: '無効なソース',
    width: 400,
    height: 300,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const img = canvas.getByRole('img', { name: '無効なソース' });
    await expect(img).toBeInTheDocument();
  },
};

export const CustomFallback: Story = {
  args: {
    src: undefined,
    fallbackSrc: 'https://images.unsplash.com/photo-1746289271913-12e4d839c045?w=400&q=80',
    alt: 'カスタムフォールバック',
    width: 400,
    height: 300,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const img = canvas.getByRole('img', { name: 'カスタムフォールバック' });
    await expect(img).toBeInTheDocument();
  },
};

export const FillMode: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1746289271913-12e4d839c045?w=400&q=80',
    alt: 'Fillモード画像',
    fill: true,
  },
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', width: 400, height: 300 }}>
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const img = canvas.getByRole('img', { name: 'Fillモード画像' });
    await expect(img).toBeInTheDocument();
  },
};
