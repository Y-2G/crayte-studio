import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import type { ActivityItem } from '@/types/ui';
import { ActivityList } from './ActivityList';

const meta = {
  title: 'Admin/ActivityList',
  component: ActivityList,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '480px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ActivityList>;

export default meta;
type Story = StoryObj<typeof meta>;

const normalInbox: ActivityItem = {
  id: 'inbox-001',
  type: 'inbox',
  icon: '📨',
  title: 'Webサイト制作についてのお問い合わせ',
  description: '山田 太郎 からのメッセージ',
  timestamp: '2024-02-15T14:30:00Z',
  href: '/admin/inbox/inbox-001',
  severity: 'low',
  isHorror: false,
  meta: { category: 'general', status: 'resolved' },
};

const horrorInbox: ActivityItem = {
  id: 'inbox-005',
  type: 'inbox',
  icon: '⚠',
  title: '警告',
  description: '観察者 からのメッセージ',
  timestamp: '2024-02-11T03:33:33Z',
  href: '/admin/inbox/inbox-005',
  severity: 'high',
  isHorror: true,
  meta: { category: 'sign', status: 'open' },
};

const subtleAnomaly: ActivityItem = {
  id: 'ae-001',
  type: 'anomaly',
  icon: '⏰',
  title: '記事の日時矛盾が検出されました',
  description: 'temporal — subtle',
  timestamp: '2024-05-18T03:33:33Z',
  severity: 'low',
  isHorror: true,
  meta: { eventType: 'temporal', level: 'subtle', targetId: 'post-007' },
};

const noticeableAnomaly: ActivityItem = {
  id: 'ae-002',
  type: 'anomaly',
  icon: '🗑',
  title: 'スタッフのプロフィールデータが消失',
  description: 'deletion — noticeable',
  timestamp: '2024-05-15T02:00:00Z',
  severity: 'medium',
  isHorror: true,
  meta: { eventType: 'deletion', level: 'noticeable', targetId: 'staff-kobayashi' },
};

const severeAnomaly: ActivityItem = {
  id: 'ae-005',
  type: 'anomaly',
  icon: '⚠',
  title: 'システムログに不明なエントリ',
  description: 'warning — severe',
  timestamp: '2024-05-20T03:33:33Z',
  severity: 'high',
  isHorror: true,
  meta: { eventType: 'warning', level: 'severe', targetId: 'system' },
};

export const Default: Story = {
  args: {
    items: [severeAnomaly, subtleAnomaly, noticeableAnomaly, normalInbox, horrorInbox],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('受信箱')).toBeInTheDocument();
    await expect(canvas.getByText('アノマリー')).toBeInTheDocument();
  },
};

export const InboxOnly: Story = {
  args: {
    items: [normalInbox, horrorInbox],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Webサイト制作についてのお問い合わせ')).toBeInTheDocument();
    await expect(canvas.getByText('警告')).toBeInTheDocument();
  },
};

export const AnomalyOnly: Story = {
  args: {
    items: [severeAnomaly, noticeableAnomaly, subtleAnomaly],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('システムログに不明なエントリ')).toBeInTheDocument();
    await expect(canvas.getByText('スタッフのプロフィールデータが消失')).toBeInTheDocument();
  },
};

export const Empty: Story = {
  args: {
    items: [],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('アクティビティはありません')).toBeInTheDocument();
  },
};
