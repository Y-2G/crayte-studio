import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { Input } from './Input';

const meta = {
  title: 'Shared/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'テキストを入力',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'お名前',
    placeholder: '山田太郎',
  },
};

export const WithHint: Story = {
  args: {
    label: 'メールアドレス',
    type: 'email',
    placeholder: 'example@email.com',
    hint: '確認メールを送信します',
  },
};

export const WithError: Story = {
  args: {
    label: 'メールアドレス',
    type: 'email',
    value: 'invalid-email',
    error: '有効なメールアドレスを入力してください',
  },
};

export const FullWidth: Story = {
  args: {
    label: 'フルワイド入力',
    placeholder: '幅いっぱいに広がります',
    fullWidth: true,
  },
};

export const Disabled: Story = {
  args: {
    label: '無効な入力',
    value: '編集できません',
    disabled: true,
  },
};
