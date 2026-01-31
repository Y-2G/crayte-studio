import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { HeroVideo } from './HeroVideo';

const meta = {
  title: 'Public/HeroVideo',
  component: HeroVideo,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof HeroVideo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    videoSrc: '/movies/hero-crayte.mp4',
    children: (
      <div style={{ textAlign: 'center', color: 'white' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>CRAYTE STUDIO</h1>
        <p style={{ fontSize: '1.2rem' }}>テクノロジーとクリエイティビティの融合</p>
      </div>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('CRAYTE STUDIO')).toBeInTheDocument();
    await expect(canvas.getByText('テクノロジーとクリエイティビティの融合')).toBeInTheDocument();
    // Verify video element exists and is hidden from accessibility tree
    const video = canvasElement.querySelector('video');
    if (video) {
      await expect(video).toHaveAttribute('aria-hidden', 'true');
    }
  },
};

export const WithPoster: Story = {
  args: {
    videoSrc: '/movies/hero-crayte.mp4',
    posterSrc: '/images/hero-poster.jpg',
    children: (
      <div style={{ textAlign: 'center', color: 'white' }}>
        <h1 style={{ fontSize: '3rem' }}>ポスター画像付き</h1>
      </div>
    ),
  },
};

export const WithLoopDelay: Story = {
  args: {
    videoSrc: '/movies/hero-crayte.mp4',
    loopDelay: 3,
    children: (
      <div style={{ textAlign: 'center', color: 'white' }}>
        <h1 style={{ fontSize: '3rem' }}>3秒遅延ループ</h1>
      </div>
    ),
  },
};

export const FallbackOnly: Story = {
  args: {
    videoSrc: '/nonexistent-video.mp4',
    children: (
      <div style={{ textAlign: 'center', color: 'white' }}>
        <h1 style={{ fontSize: '3rem' }}>フォールバック表示</h1>
        <p>動画読み込み失敗時のグラデーション背景</p>
      </div>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('フォールバック表示')).toBeInTheDocument();
  },
};
