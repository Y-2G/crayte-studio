import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { Post } from '@/types';
import { NewsTimeline } from './NewsTimeline';

const samplePosts: Post[] = [
  {
    id: '1',
    slug: 'company-website-renewal',
    title: 'コーポレートサイトをリニューアルしました',
    content: '',
    excerpt: '',
    status: 'publish',
    visibility: 'public',
    category: 'お知らせ',
    tags: ['リニューアル'],
    author: '管理者',
    reviewComments: [],
    meta: {},
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z',
    publishedAt: '2025-01-15T10:00:00Z',
  },
  {
    id: '2',
    slug: 'new-service-launch',
    title: '新サービス「クリエイティブコンサルティング」開始',
    content: '',
    excerpt: '',
    status: 'publish',
    visibility: 'public',
    category: 'サービス',
    tags: ['新サービス'],
    author: '管理者',
    reviewComments: [],
    meta: {},
    createdAt: '2025-01-10T10:00:00Z',
    updatedAt: '2025-01-10T10:00:00Z',
    publishedAt: '2025-01-10T10:00:00Z',
  },
  {
    id: '3',
    slug: 'award-winning',
    title: 'Web Design Award 2025 受賞のお知らせ',
    content: '',
    excerpt: '',
    status: 'publish',
    visibility: 'public',
    category: '受賞',
    tags: ['受賞'],
    author: '管理者',
    reviewComments: [],
    meta: {},
    createdAt: '2025-01-05T10:00:00Z',
    updatedAt: '2025-01-05T10:00:00Z',
    publishedAt: '2025-01-05T10:00:00Z',
  },
  {
    id: '4',
    slug: 'hiring-engineers',
    title: 'エンジニア・デザイナー積極採用中',
    content: '',
    excerpt: '',
    status: 'publish',
    visibility: 'public',
    category: '採用',
    tags: ['採用'],
    author: '管理者',
    reviewComments: [],
    meta: {},
    createdAt: '2024-12-20T10:00:00Z',
    updatedAt: '2024-12-20T10:00:00Z',
    publishedAt: '2024-12-20T10:00:00Z',
  },
];

const meta = {
  title: 'Public/NewsTimeline',
  component: NewsTimeline,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof NewsTimeline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    posts: samplePosts,
  },
};

export const FewPosts: Story = {
  args: {
    posts: samplePosts.slice(0, 2),
  },
};

export const Empty: Story = {
  args: {
    posts: [],
  },
};
