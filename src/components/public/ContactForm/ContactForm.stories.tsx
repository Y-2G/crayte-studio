import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { ContactForm } from './ContactForm';

const meta = {
  title: 'Public/ContactForm',
  component: ContactForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ContactForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Verify form fields exist
    await expect(canvas.getByText('お名前')).toBeInTheDocument();
    await expect(canvas.getByText('メールアドレス')).toBeInTheDocument();
    await expect(canvas.getByText('件名')).toBeInTheDocument();
    await expect(canvas.getByText(/メッセージ/)).toBeInTheDocument();
    // Verify submit button
    await expect(canvas.getByRole('button', { name: '送信する' })).toBeInTheDocument();
  },
};

export const ValidationErrors: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Verify form exists with required fields
    const submitButton = canvas.getByRole('button', { name: '送信する' });
    await expect(submitButton).toBeInTheDocument();
    // Verify required inputs exist (native validation prevents custom errors on empty submit)
    const inputs = canvasElement.querySelectorAll('input[required], textarea[required]');
    await expect(inputs.length).toBeGreaterThanOrEqual(3);
  },
};

export const FillForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Fill in form fields
    const nameInputs = canvas.getAllByRole('textbox');
    // Name field
    await userEvent.type(nameInputs[0], '山田太郎');
    await expect(nameInputs[0]).toHaveValue('山田太郎');
    // Email field
    await userEvent.type(nameInputs[1], 'yamada@example.com');
    await expect(nameInputs[1]).toHaveValue('yamada@example.com');
    // Subject field
    await userEvent.type(nameInputs[2], 'お問い合わせ');
    await expect(nameInputs[2]).toHaveValue('お問い合わせ');
  },
};
