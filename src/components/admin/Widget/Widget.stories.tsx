import type { Meta, StoryObj } from '@storybook/nextjs-vite';
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
};
