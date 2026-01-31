import type { Meta, StoryObj } from '@storybook/nextjs-vite';
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

export const Default: Story = {};

export const Custom: Story = {
  args: {
    titleEn: "Start Your Project\n Today",
    subtitle: '新しいプロジェクトを始めましょう。',
    buttonText: '無料相談',
    buttonLink: '/contact',
  },
};

export const MinimalText: Story = {
  args: {
    titleEn: 'Get in Touch',
    subtitle: undefined,
    buttonText: 'Contact Us',
    buttonLink: '/contact',
  },
};
