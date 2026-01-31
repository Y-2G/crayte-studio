import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { Post } from '@/types';
import { PostsTable } from './PostsTable';

const samplePosts: Post[] = [
  {
    id: '1',
    slug: 'welcome-post',
    title: 'ようこそ CRAYTE STUDIO へ',
    content: '<p>初めての投稿です。</p>',
    excerpt: '初めての投稿です。',
    status: 'publish',
    visibility: 'public',
    category: 'お知らせ',
    tags: ['公式', 'お知らせ'],
    author: '管理者',
    reviewComments: [],
    meta: {},
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z',
    publishedAt: '2025-01-15T10:00:00Z',
  },
  {
    id: '2',
    slug: 'web-design-trends-2025',
    title: '2025年のWebデザイントレンド',
    content: '<p>トレンド解説記事</p>',
    excerpt: 'トレンド解説記事',
    status: 'publish',
    visibility: 'public',
    category: 'ブログ',
    tags: ['Webデザイン', 'トレンド', 'UI/UX', 'フロントエンド'],
    author: '田中一郎',
    reviewComments: [],
    meta: {},
    createdAt: '2025-01-10T10:00:00Z',
    updatedAt: '2025-01-12T10:00:00Z',
    publishedAt: '2025-01-12T10:00:00Z',
  },
  {
    id: '3',
    slug: 'draft-post',
    title: '下書き記事のサンプル',
    content: '<p>下書き中</p>',
    excerpt: '下書き中',
    status: 'draft',
    visibility: 'public',
    category: 'ブログ',
    tags: ['下書き'],
    author: '鈴木花子',
    reviewComments: [],
    meta: {},
    createdAt: '2025-01-08T10:00:00Z',
    updatedAt: '2025-01-08T10:00:00Z',
  },
  {
    id: '4',
    slug: 'pending-review',
    title: 'レビュー待ち記事',
    content: '<p>レビュー待ち</p>',
    excerpt: 'レビュー待ち',
    status: 'pending',
    visibility: 'public',
    category: 'ニュース',
    tags: ['レビュー'],
    author: '佐藤美咲',
    reviewComments: [],
    meta: {},
    createdAt: '2025-01-05T10:00:00Z',
    updatedAt: '2025-01-06T10:00:00Z',
  },
  {
    id: '5',
    slug: 'horror-post',
    title: '██████████ の記録',
    content: '<p>内容が書き換えられています</p>',
    excerpt: '内容が書き換えられています',
    status: 'draft',
    visibility: 'private',
    category: '内部連絡',
    tags: ['内部', '機密'],
    author: '不明',
    reviewComments: [],
    meta: {
      anomalyLevel: 'severe',
      isRewritten: true,
      observationNotes: ['内容が自動的に変更された'],
    },
    createdAt: '2025-01-01T03:33:33Z',
    updatedAt: '2025-01-01T03:33:33Z',
  },
];

const meta = {
  title: 'Admin/PostsTable',
  component: PostsTable,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/admin/posts',
      },
    },
  },
} satisfies Meta<typeof PostsTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    posts: samplePosts,
  },
};

export const PublishedOnly: Story = {
  args: {
    posts: samplePosts.filter((p) => p.status === 'publish'),
  },
};

export const WithHorrorPosts: Story = {
  args: {
    posts: samplePosts.filter((p) => p.category === '内部連絡' || p.status === 'publish'),
  },
};

export const Empty: Story = {
  args: {
    posts: [],
  },
};
