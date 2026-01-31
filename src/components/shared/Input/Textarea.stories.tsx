import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { Textarea } from './Textarea';

const meta = {
  title: 'Shared/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'メッセージを入力してください',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'お問い合わせ内容',
    placeholder: 'ご要望をお聞かせください',
  },
};

export const WithHint: Story = {
  args: {
    label: 'メッセージ',
    placeholder: 'メッセージを入力してください',
    hint: '最大500文字まで',
  },
};

export const WithError: Story = {
  args: {
    label: 'メッセージ',
    error: 'メッセージを入力してください',
  },
};

export const FullWidth: Story = {
  args: {
    label: 'コメント',
    placeholder: 'コメントを入力',
    fullWidth: true,
  },
};
