import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText('テキストを入力');
    await expect(input).toBeInTheDocument();
    await userEvent.type(input, 'テスト入力');
    await expect(input).toHaveValue('テスト入力');
  },
};

export const WithLabel: Story = {
  args: {
    label: 'お名前',
    placeholder: '山田太郎',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('お名前')).toBeInTheDocument();
    const input = canvas.getByPlaceholderText('山田太郎');
    await expect(input).toBeInTheDocument();
    await userEvent.type(input, '山田太郎');
    await expect(input).toHaveValue('山田太郎');
  },
};

export const WithHint: Story = {
  args: {
    label: 'メールアドレス',
    type: 'email',
    placeholder: 'example@email.com',
    hint: '確認メールを送信します',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('確認メールを送信します')).toBeInTheDocument();
  },
};

export const WithError: Story = {
  args: {
    label: 'メールアドレス',
    type: 'email',
    value: 'invalid-email',
    error: '有効なメールアドレスを入力してください',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const errorMessage = canvas.getByRole('alert');
    await expect(errorMessage).toBeInTheDocument();
    await expect(errorMessage).toHaveTextContent('有効なメールアドレスを入力してください');
    const input = canvas.getByRole('textbox');
    await expect(input).toHaveAttribute('aria-invalid', 'true');
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');
    await expect(input).toBeDisabled();
  },
};
