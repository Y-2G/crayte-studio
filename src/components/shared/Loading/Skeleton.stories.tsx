import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Skeleton } from './Skeleton';

const meta = {
  title: 'Shared/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'rectangular', 'circular'],
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    variant: 'text',
    width: 200,
  },
};

export const Rectangular: Story = {
  args: {
    variant: 'rectangular',
    width: 300,
    height: 200,
  },
};

export const Circular: Story = {
  args: {
    variant: 'circular',
    width: 60,
    height: 60,
  },
};

export const CardSkeleton: Story = {
  render: () => (
    <div style={{ width: 300, display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Skeleton variant="rectangular" width={300} height={180} />
      <Skeleton variant="text" width={200} />
      <Skeleton variant="text" width={260} />
      <Skeleton variant="text" width={140} />
    </div>
  ),
};

export const ProfileSkeleton: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Skeleton variant="circular" width={48} height={48} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Skeleton variant="text" width={150} />
        <Skeleton variant="text" width={100} />
      </div>
    </div>
  ),
};
