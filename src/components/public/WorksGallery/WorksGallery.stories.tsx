import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { Work } from '@/types';
import { WorksGallery } from './WorksGallery';

const sampleWorks: Work[] = [
  {
    id: '1',
    slug: 'corporate-site-abc',
    title: 'ABC株式会社 コーポレートサイト',
    description: 'リブランディングに伴うコーポレートサイトのフルリニューアル',
    client: 'ABC株式会社',
    venue: '',
    date: '2025-01',
    status: 'live',
    images: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800'],
    tags: ['Web制作', 'コーポレートサイト'],
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z',
  },
  {
    id: '2',
    slug: 'event-xyz',
    title: 'XYZ Conference 2025',
    description: '年次カンファレンスの企画・運営',
    client: 'XYZ Corporation',
    venue: '東京国際フォーラム',
    date: '2025-02',
    status: 'closed',
    images: ['https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'],
    tags: ['イベント企画'],
    createdAt: '2025-02-01T00:00:00Z',
    updatedAt: '2025-02-01T00:00:00Z',
  },
  {
    id: '3',
    slug: 'promo-video',
    title: 'DEF社 プロモーション映像',
    description: '新商品ローンチに向けたプロモーション映像制作',
    client: 'DEF株式会社',
    venue: '',
    date: '2024-12',
    status: 'live',
    images: ['https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800'],
    tags: ['映像制作', 'プロモーション'],
    createdAt: '2024-12-01T00:00:00Z',
    updatedAt: '2024-12-01T00:00:00Z',
  },
  {
    id: '4',
    slug: 'ec-site-ghi',
    title: 'GHI ECサイト',
    description: 'アパレルブランドのECサイト構築',
    client: 'GHI株式会社',
    venue: '',
    date: '2024-11',
    status: 'live',
    images: [],
    tags: ['Web制作', 'ECサイト'],
    createdAt: '2024-11-01T00:00:00Z',
    updatedAt: '2024-11-01T00:00:00Z',
  },
];

const meta = {
  title: 'Public/WorksGallery',
  component: WorksGallery,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof WorksGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    works: sampleWorks,
  },
};

export const TwoWorks: Story = {
  args: {
    works: sampleWorks.slice(0, 2),
  },
};

export const WithPlaceholderImages: Story = {
  args: {
    works: sampleWorks.map((w) => ({ ...w, images: [] })),
  },
};

export const Empty: Story = {
  args: {
    works: [],
  },
};
