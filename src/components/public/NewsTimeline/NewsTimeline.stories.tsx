import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import type { Post } from '@/types';
import { NewsTimeline } from './NewsTimeline';

const samplePosts: Post[] = [
  {
    id: '1', slug: 'company-website-renewal', title: 'コーポレートサイトをリニューアルしました',
    content: '', excerpt: '', status: 'publish', visibility: 'public', category: 'お知らせ',
    tags: ['リニューアル'], author: '管理者', reviewComments: [], meta: {},
    createdAt: '2025-01-15T10:00:00Z', updatedAt: '2025-01-15T10:00:00Z', publishedAt: '2025-01-15T10:00:00Z',
  },
  {
    id: '2', slug: 'new-service-launch', title: '新サービス「クリエイティブコンサルティング」開始',
    content: '', excerpt: '', status: 'publish', visibility: 'public', category: 'サービス',
    tags: ['新サービス'], author: '管理者', reviewComments: [], meta: {},
    createdAt: '2025-01-10T10:00:00Z', updatedAt: '2025-01-10T10:00:00Z', publishedAt: '2025-01-10T10:00:00Z',
  },
  {
    id: '3', slug: 'award-winning', title: 'Web Design Award 2025 受賞のお知らせ',
    content: '', excerpt: '', status: 'publish', visibility: 'public', category: '受賞',
    tags: ['受賞'], author: '管理者', reviewComments: [], meta: {},
    createdAt: '2025-01-05T10:00:00Z', updatedAt: '2025-01-05T10:00:00Z', publishedAt: '2025-01-05T10:00:00Z',
  },
];

const meta = {
  title: 'Public/NewsTimeline',
  component: NewsTimeline,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof NewsTimeline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { posts: samplePosts },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('News')).toBeInTheDocument();
    await expect(canvas.getByText('コーポレートサイトをリニューアルしました')).toBeInTheDocument();
    await expect(canvas.getByText('新サービス「クリエイティブコンサルティング」開始')).toBeInTheDocument();
    await expect(canvas.getByText('Web Design Award 2025 受賞のお知らせ')).toBeInTheDocument();
    // Verify categories
    await expect(canvas.getByText('お知らせ')).toBeInTheDocument();
    await expect(canvas.getByText('サービス')).toBeInTheDocument();
    await expect(canvas.getByText('受賞')).toBeInTheDocument();
    // Verify CTA link
    const link = canvas.getByRole('link', { name: /一覧を見る/ });
    await expect(link).toBeInTheDocument();
  },
};

export const FewPosts: Story = {
  args: { posts: samplePosts.slice(0, 1) },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('コーポレートサイトをリニューアルしました')).toBeInTheDocument();
  },
};

export const Empty: Story = {
  args: { posts: [] },
  play: async ({ canvasElement }) => {
    // Should render nothing when no posts
    await expect(canvasElement.children.length).toBe(0);
  },
};
