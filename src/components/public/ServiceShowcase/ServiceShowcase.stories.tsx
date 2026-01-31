import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ServiceShowcase } from './ServiceShowcase';

const sampleServices = [
  {
    title: 'Web制作',
    titleEn: 'Web Production',
    description: 'コーポレートサイト・ECサイト・Webアプリなど、目的に合わせた最適なWeb制作を行います。',
    tags: ['コーポレートサイト', 'ECサイト', 'Webアプリ'],
    icon: 'web' as const,
    link: '/services#web',
  },
  {
    title: 'イベント企画',
    titleEn: 'Event Planning',
    description: 'セミナー・展示会・社内イベントなど、印象に残るイベントを企画・運営します。',
    tags: ['セミナー', '展示会', '社内イベント'],
    icon: 'event' as const,
    link: '/services#event',
  },
  {
    title: '映像制作',
    titleEn: 'Video Production',
    description: 'プロモーション映像・企業VP・SNS動画など、効果的な映像コンテンツを制作します。',
    tags: ['プロモーション', '企業VP', 'SNS動画'],
    icon: 'video' as const,
    link: '/services#video',
  },
];

const meta = {
  title: 'Public/ServiceShowcase',
  component: ServiceShowcase,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ServiceShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    services: sampleServices,
  },
};

export const SingleService: Story = {
  args: {
    services: sampleServices.slice(0, 1),
  },
};

export const Empty: Story = {
  args: {
    services: [],
  },
};
