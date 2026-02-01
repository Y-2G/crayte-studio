import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { ScrollReveal } from './ScrollReveal';

const meta = {
  title: 'Public/ScrollReveal',
  component: ScrollReveal,
  tags: ['autodocs'],
} satisfies Meta<typeof ScrollReveal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div style={{ padding: '24px', background: '#f0f0f0', borderRadius: '8px' }}>
        <h3>スクロールで表示されるコンテンツ</h3>
        <p>このコンテンツは画面に入ると表示アニメーションが実行されます。</p>
      </div>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('スクロールで表示されるコンテンツ')).toBeInTheDocument();
    await expect(canvas.getByText(/このコンテンツは画面に入ると/)).toBeInTheDocument();
  },
};

export const WithDelay: Story = {
  args: {
    delay: 300,
    children: (
      <div style={{ padding: '24px', background: '#e0f0ff', borderRadius: '8px' }}>
        <h3>遅延付きアニメーション</h3>
        <p>300msの遅延後にアニメーションが開始されます。</p>
      </div>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('遅延付きアニメーション')).toBeInTheDocument();
  },
};

export const Staggered: Story = {
  args: {} as Story['args'],
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {[0, 100, 200, 300].map((delay) => (
        <ScrollReveal key={delay} delay={delay}>
          <div style={{ padding: '16px', background: '#f5f5f5', borderRadius: '8px' }}>
            遅延: {delay}ms
          </div>
        </ScrollReveal>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('遅延: 0ms')).toBeInTheDocument();
    await expect(canvas.getByText('遅延: 100ms')).toBeInTheDocument();
    await expect(canvas.getByText('遅延: 200ms')).toBeInTheDocument();
    await expect(canvas.getByText('遅延: 300ms')).toBeInTheDocument();
  },
};
