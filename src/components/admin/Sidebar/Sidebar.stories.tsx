import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { Sidebar } from './Sidebar';

const meta = {
  title: 'Admin/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/admin',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ height: '100vh' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    onToggle: fn(),
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    collapsed: false,
  },
};

export const Collapsed: Story = {
  args: {
    collapsed: true,
  },
};

export const PostsActive: Story = {
  args: {
    collapsed: false,
  },
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/admin/posts',
      },
    },
  },
};

export const WorksActive: Story = {
  args: {
    collapsed: false,
  },
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/admin/works',
      },
    },
  },
};

export const SettingsActive: Story = {
  args: {
    collapsed: false,
  },
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/admin/settings',
      },
    },
  },
};
