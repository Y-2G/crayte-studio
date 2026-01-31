import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { CtaBlock } from './CtaBlock';

const meta = {
  title: 'Public/CtaBlock',
  component: CtaBlock,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof CtaBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/Let's Create Something/)).toBeInTheDocument();
    await expect(canvas.getByText('あなたのビジョンを、私たちと一緒に形にしませんか。')).toBeInTheDocument();
    const link = canvas.getByRole('link', { name: /お問い合わせ/ });
    await expect(link).toBeInTheDocument();
    await expect(link).toHaveAttribute('href', '/contact');
  },
};

export const Custom: Story = {
  args: {
    titleEn: "Start Your Project\n Today",
    subtitle: '新しいプロジェクトを始めましょう。',
    buttonText: '無料相談',
    buttonLink: '/contact',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/Start Your Project/)).toBeInTheDocument();
    await expect(canvas.getByText('新しいプロジェクトを始めましょう。')).toBeInTheDocument();
    const link = canvas.getByRole('link', { name: /無料相談/ });
    await expect(link).toHaveAttribute('href', '/contact');
  },
};

export const MinimalText: Story = {
  args: {
    titleEn: 'Get in Touch',
    subtitle: undefined,
    buttonText: 'Contact Us',
    buttonLink: '/contact',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Get in Touch')).toBeInTheDocument();
  },
};
