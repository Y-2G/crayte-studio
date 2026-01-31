import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { Spinner } from './Spinner';

const meta = {
  title: 'Shared/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'white'],
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'md',
    color: 'primary',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const spinner = canvas.getByRole('status');
    await expect(spinner).toBeInTheDocument();
    await expect(spinner).toHaveAttribute('aria-label', '読み込み中');
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('status')).toBeInTheDocument();
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const Secondary: Story = {
  args: {
    color: 'secondary',
  },
};

export const White: Story = {
  args: {
    color: 'white',
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#333', padding: '24px', borderRadius: '8px' }}>
        <Story />
      </div>
    ),
  ],
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const spinners = canvas.getAllByRole('status');
    await expect(spinners).toHaveLength(3);
  },
};
