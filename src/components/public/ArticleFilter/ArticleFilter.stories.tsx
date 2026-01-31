import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ArticleFilter } from './ArticleFilter';

const meta = {
  title: 'Public/ArticleFilter',
  component: ArticleFilter,
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/articles',
        query: {},
      },
    },
  },
  argTypes: {
    activeFilter: {
      control: 'select',
      options: ['all', 'news', 'blog'],
    },
  },
} satisfies Meta<typeof ArticleFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const All: Story = {
  args: {
    activeFilter: 'all',
  },
};

export const News: Story = {
  args: {
    activeFilter: 'news',
  },
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/articles',
        query: { filter: 'news' },
      },
    },
  },
};

export const Blog: Story = {
  args: {
    activeFilter: 'blog',
  },
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/articles',
        query: { filter: 'blog' },
      },
    },
  },
};
