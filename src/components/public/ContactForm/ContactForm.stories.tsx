import type { Meta, StoryObj } from '@storybook/nextjs-vite';
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

export const Default: Story = {};
