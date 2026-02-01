import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within, userEvent } from 'storybook/test';
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Verify title
    await expect(canvas.getByText('公開設定')).toBeInTheDocument();
    // Verify content visible (not collapsed by default)
    await expect(canvas.getByText(/下書き/)).toBeInTheDocument();
    await expect(canvas.getByText(/非公開/)).toBeInTheDocument();
    // Verify aria-expanded
    const headerBtn = canvas.getByRole('button', { name: /公開設定/ });
    await expect(headerBtn).toHaveAttribute('aria-expanded', 'true');
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('公開')).toBeInTheDocument();
    await expect(canvas.getByText(/公開済み/)).toBeInTheDocument();
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('カテゴリ')).toBeInTheDocument();
    // Content should be hidden when collapsed
    const headerBtn = canvas.getByRole('button', { name: /カテゴリ/ });
    await expect(headerBtn).toHaveAttribute('aria-expanded', 'false');
    // Expand by clicking
    await userEvent.click(headerBtn);
    await expect(headerBtn).toHaveAttribute('aria-expanded', 'true');
    await expect(canvas.getByText('ニュース')).toBeInTheDocument();
    await expect(canvas.getByText('ブログ')).toBeInTheDocument();
    await expect(canvas.getByText('お知らせ')).toBeInTheDocument();
  },
};

export const MultiplePanels: Story = {
  args: {} as Story['args'],
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('公開')).toBeInTheDocument();
    await expect(canvas.getByText('カテゴリ')).toBeInTheDocument();
    await expect(canvas.getByText('タグ')).toBeInTheDocument();
  },
};
