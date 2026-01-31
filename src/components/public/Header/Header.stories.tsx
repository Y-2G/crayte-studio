import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Header } from './Header';

const meta = {
  title: 'Public/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/',
      },
    },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const OnServicesPage: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/services',
      },
    },
  },
};

export const OnArticlesPage: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/articles',
        query: { filter: 'news' },
      },
    },
  },
};
