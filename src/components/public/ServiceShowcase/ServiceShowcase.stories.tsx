import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { ServiceShowcase } from './ServiceShowcase';

const sampleServices = [
  {
    title: 'Web制作', titleEn: 'Web Production',
    description: 'コーポレートサイト・ECサイト・Webアプリなど、目的に合わせた最適なWeb制作を行います。',
    tags: ['コーポレートサイト', 'ECサイト', 'Webアプリ'], icon: 'web' as const, link: '/services#web',
  },
  {
    title: 'イベント企画', titleEn: 'Event Planning',
    description: 'セミナー・展示会・社内イベントなど、印象に残るイベントを企画・運営します。',
    tags: ['セミナー', '展示会', '社内イベント'], icon: 'event' as const, link: '/services#event',
  },
  {
    title: '映像制作', titleEn: 'Video Production',
    description: 'プロモーション映像・企業VP・SNS動画など、効果的な映像コンテンツを制作します。',
    tags: ['プロモーション', '企業VP', 'SNS動画'], icon: 'video' as const, link: '/services#video',
  },
];

const meta = {
  title: 'Public/ServiceShowcase',
  component: ServiceShowcase,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ServiceShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { services: sampleServices },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Service')).toBeInTheDocument();
    // Verify all service cards
    await expect(canvas.getByText('Web制作')).toBeInTheDocument();
    await expect(canvas.getByText('イベント企画')).toBeInTheDocument();
    await expect(canvas.getByText('映像制作')).toBeInTheDocument();
    // Verify descriptions
    await expect(canvas.getByText(/コーポレートサイト・ECサイト/)).toBeInTheDocument();
    // Verify CTA
    const link = canvas.getByRole('link', { name: /詳しく見る/ });
    await expect(link).toBeInTheDocument();
    // Verify section heading
    const section = canvas.getByRole('region', { name: /Service/i });
    await expect(section).toBeInTheDocument();
  },
};

export const SingleService: Story = {
  args: { services: sampleServices.slice(0, 1) },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Web制作')).toBeInTheDocument();
  },
};

export const Empty: Story = {
  args: { services: [] },
  play: async ({ canvasElement }) => {
    await expect(canvasElement.children.length).toBe(0);
  },
};
