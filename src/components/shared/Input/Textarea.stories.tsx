import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByPlaceholderText('メッセージを入力してください');
    await expect(textarea).toBeInTheDocument();
    await userEvent.type(textarea, 'テストメッセージ');
    await expect(textarea).toHaveValue('テストメッセージ');
  },
};

export const WithLabel: Story = {
  args: {
    label: 'お問い合わせ内容',
    placeholder: 'ご要望をお聞かせください',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('お問い合わせ内容')).toBeInTheDocument();
  },
};

export const WithHint: Story = {
  args: {
    label: 'メッセージ',
    placeholder: 'メッセージを入力してください',
    hint: '最大500文字まで',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('最大500文字まで')).toBeInTheDocument();
  },
};

export const WithError: Story = {
  args: {
    label: 'メッセージ',
    error: 'メッセージを入力してください',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const errorMessage = canvas.getByRole('alert');
    await expect(errorMessage).toHaveTextContent('メッセージを入力してください');
    const textarea = canvas.getByRole('textbox');
    await expect(textarea).toHaveAttribute('aria-invalid', 'true');
  },
};

export const FullWidth: Story = {
  args: {
    label: 'コメント',
    placeholder: 'コメントを入力',
    fullWidth: true,
  },
};
