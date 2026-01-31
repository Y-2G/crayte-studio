import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { EditPage } from './EditPage';

const meta = {
  title: 'Admin/EditPage',
  component: EditPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof EditPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '新規投稿を追加',
    children: (
      <div style={{ padding: '16px', border: '1px solid #ddd', borderRadius: '4px', minHeight: '300px' }}>
        <input
          type="text"
          placeholder="タイトルを入力"
          style={{ width: '100%', padding: '8px', fontSize: '18px', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '16px' }}
        />
        <textarea
          placeholder="本文を入力"
          style={{ width: '100%', minHeight: '200px', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
        />
      </div>
    ),
    sidebar: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ padding: '16px', border: '1px solid #ddd', borderRadius: '4px' }}>
          <h2 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>公開設定</h2>
          <p style={{ margin: 0, fontSize: '13px' }}>ステータス: 下書き</p>
          <button style={{ marginTop: '8px', padding: '6px 12px' }}>公開する</button>
        </div>
        <div style={{ padding: '16px', border: '1px solid #ddd', borderRadius: '4px' }}>
          <h2 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>カテゴリ</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '13px' }}>
            <li><label><input type="checkbox" aria-label="ニュース" /> ニュース</label></li>
            <li><label><input type="checkbox" aria-label="ブログ" /> ブログ</label></li>
          </ul>
        </div>
      </div>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Verify page title
    await expect(canvas.getByText('新規投稿を追加')).toBeInTheDocument();
    // Verify main content area
    await expect(canvas.getByPlaceholderText('タイトルを入力')).toBeInTheDocument();
    await expect(canvas.getByPlaceholderText('本文を入力')).toBeInTheDocument();
    // Verify sidebar content
    await expect(canvas.getByText('公開設定')).toBeInTheDocument();
    await expect(canvas.getByText('カテゴリ')).toBeInTheDocument();
    // Verify sidebar aside element exists
    const aside = canvasElement.querySelector('aside');
    await expect(aside).toBeInTheDocument();
  },
};

export const WithoutSidebar: Story = {
  args: {
    title: 'シンプルなページ編集',
    children: (
      <div style={{ padding: '16px', border: '1px solid #ddd', borderRadius: '4px' }}>
        <p>サイドバーなしのレイアウトです。</p>
      </div>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('シンプルなページ編集')).toBeInTheDocument();
    await expect(canvas.getByText('サイドバーなしのレイアウトです。')).toBeInTheDocument();
    // Sidebar aside should not exist
    const aside = canvasElement.querySelector('aside');
    await expect(aside).toBeNull();
  },
};

export const WithoutTitle: Story = {
  args: {
    children: (
      <div style={{ padding: '16px', border: '1px solid #ddd', borderRadius: '4px' }}>
        <p>タイトルなしのレイアウトです。</p>
      </div>
    ),
    sidebar: (
      <div style={{ padding: '16px', border: '1px solid #ddd', borderRadius: '4px' }}>
        <p>サイドバー</p>
      </div>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('タイトルなしのレイアウトです。')).toBeInTheDocument();
    await expect(canvas.getByText('サイドバー')).toBeInTheDocument();
    // No h1 should exist (no title)
    const h1 = canvasElement.querySelector('h1');
    await expect(h1).toBeNull();
  },
};
