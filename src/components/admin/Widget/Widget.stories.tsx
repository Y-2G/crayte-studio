import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { Widget } from './Widget';

const meta = {
  title: 'Admin/Widget',
  component: Widget,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '400px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Widget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'ダッシュボード',
    children: <p>ウィジェットのコンテンツです。</p>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('ダッシュボード')).toBeInTheDocument();
    await expect(canvas.getByText('ウィジェットのコンテンツです。')).toBeInTheDocument();
  },
};

export const WithActions: Story = {
  args: {
    title: '最近の投稿',
    actions: <button style={{ fontSize: '12px', cursor: 'pointer' }}>すべて表示</button>,
    children: (
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        <li style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>投稿タイトル1</li>
        <li style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>投稿タイトル2</li>
        <li style={{ padding: '8px 0' }}>投稿タイトル3</li>
      </ul>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('最近の投稿')).toBeInTheDocument();
    await expect(canvas.getByText('すべて表示')).toBeInTheDocument();
    await expect(canvas.getByText('投稿タイトル1')).toBeInTheDocument();
    await expect(canvas.getByText('投稿タイトル2')).toBeInTheDocument();
    await expect(canvas.getByText('投稿タイトル3')).toBeInTheDocument();
  },
};

export const StatsWidget: Story = {
  args: {
    title: 'サイト統計',
    children: (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div><strong>投稿数</strong><br />42</div>
        <div><strong>固定ページ</strong><br />8</div>
        <div><strong>コメント</strong><br />156</div>
        <div><strong>メディア</strong><br />234</div>
      </div>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('サイト統計')).toBeInTheDocument();
    await expect(canvas.getByText('投稿数')).toBeInTheDocument();
    await expect(canvas.getByText('固定ページ')).toBeInTheDocument();
    await expect(canvas.getByText('コメント')).toBeInTheDocument();
    await expect(canvas.getByText('メディア')).toBeInTheDocument();
  },
};
