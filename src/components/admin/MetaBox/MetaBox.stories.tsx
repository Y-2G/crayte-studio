import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { MetaBox } from './MetaBox';

const meta = {
  title: 'Admin/MetaBox',
  component: MetaBox,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '300px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MetaBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '公開設定',
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <p style={{ margin: 0, fontSize: '14px' }}>ステータス: <strong>下書き</strong></p>
        <p style={{ margin: 0, fontSize: '14px' }}>公開: <strong>非公開</strong></p>
        <button style={{ marginTop: '8px', padding: '6px 12px', cursor: 'pointer' }}>公開する</button>
      </div>
    ),
  },
};

export const WithAccent: Story = {
  args: {
    title: '公開',
    accent: true,
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <p style={{ margin: 0, fontSize: '14px' }}>ステータス: <strong>公開済み</strong></p>
        <button style={{ padding: '6px 12px', cursor: 'pointer' }}>更新</button>
      </div>
    ),
  },
};

export const Collapsed: Story = {
  args: {
    title: 'カテゴリ',
    defaultCollapsed: true,
    children: (
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        <li>ニュース</li>
        <li>ブログ</li>
        <li>お知らせ</li>
      </ul>
    ),
  },
};

export const MultiplePanels: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '300px' }}>
      <MetaBox title="公開" accent>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '14px' }}>
          <p style={{ margin: 0 }}>ステータス: 下書き</p>
          <button style={{ marginTop: '8px', padding: '6px 12px' }}>公開する</button>
        </div>
      </MetaBox>
      <MetaBox title="カテゴリ">
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '14px' }}>
          <li><label><input type="checkbox" /> ニュース</label></li>
          <li><label><input type="checkbox" /> ブログ</label></li>
        </ul>
      </MetaBox>
      <MetaBox title="タグ" defaultCollapsed>
        <input type="text" placeholder="タグを追加" style={{ width: '100%', padding: '4px' }} />
      </MetaBox>
    </div>
  ),
};
