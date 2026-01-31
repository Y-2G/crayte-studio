import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { WebIcon } from './WebIcon';
import { EventIcon } from './EventIcon';
import { VideoIcon } from './VideoIcon';

const meta = {
  title: 'Icons/WebIcon',
  component: WebIcon,
  tags: ['autodocs'],
  argTypes: {
    size: { control: { type: 'number', min: 16, max: 96 } },
    color: { control: 'color' },
  },
} satisfies Meta<typeof WebIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 48,
    color: 'currentColor',
  },
};

export const Small: Story = {
  args: {
    size: 24,
  },
};

export const Large: Story = {
  args: {
    size: 72,
  },
};

export const Colored: Story = {
  args: {
    size: 48,
    color: '#FF1493',
  },
};

export const AllIcons: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <WebIcon size={48} />
        <p style={{ marginTop: '8px', fontSize: '14px' }}>WebIcon</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <EventIcon size={48} />
        <p style={{ marginTop: '8px', fontSize: '14px' }}>EventIcon</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <VideoIcon size={48} />
        <p style={{ marginTop: '8px', fontSize: '14px' }}>VideoIcon</p>
      </div>
    </div>
  ),
};

export const AllSizes: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'end' }}>
      {[24, 32, 48, 64, 96].map((size) => (
        <div key={size} style={{ textAlign: 'center' }}>
          <WebIcon size={size} />
          <p style={{ marginTop: '8px', fontSize: '12px' }}>{size}px</p>
        </div>
      ))}
    </div>
  ),
};

export const WithGradientBackground: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      {[
        { Icon: WebIcon, gradient: 'linear-gradient(135deg, #FF1493 0%, #9370DB 100%)' },
        { Icon: EventIcon, gradient: 'linear-gradient(135deg, #9370DB 0%, #00BFFF 100%)' },
        { Icon: VideoIcon, gradient: 'linear-gradient(135deg, #00BFFF 0%, #FF1493 100%)' },
      ].map(({ Icon, gradient }, i) => (
        <div
          key={i}
          style={{
            width: 80,
            height: 80,
            borderRadius: '16px',
            background: gradient,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon size={40} color="white" />
        </div>
      ))}
    </div>
  ),
};
