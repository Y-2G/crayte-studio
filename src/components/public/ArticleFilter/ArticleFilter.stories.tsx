import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const allButton = canvas.getByRole('button', { name: 'すべて' });
    const newsButton = canvas.getByRole('button', { name: 'ニュース' });
    const blogButton = canvas.getByRole('button', { name: 'ブログ' });
    await expect(allButton).toBeInTheDocument();
    await expect(newsButton).toBeInTheDocument();
    await expect(blogButton).toBeInTheDocument();
    // Verify active state
    await expect(allButton).toHaveAttribute('aria-pressed', 'true');
    await expect(newsButton).toHaveAttribute('aria-pressed', 'false');
    await expect(blogButton).toHaveAttribute('aria-pressed', 'false');
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const newsButton = canvas.getByRole('button', { name: 'ニュース' });
    await expect(newsButton).toHaveAttribute('aria-pressed', 'true');
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const blogButton = canvas.getByRole('button', { name: 'ブログ' });
    await expect(blogButton).toHaveAttribute('aria-pressed', 'true');
  },
};

export const FilterInteraction: Story = {
  args: {
    activeFilter: 'all',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const newsButton = canvas.getByRole('button', { name: 'ニュース' });
    // Click filter button (navigation mock handles the push)
    await userEvent.click(newsButton);
  },
};
