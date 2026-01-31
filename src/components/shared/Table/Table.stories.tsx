import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { Table } from './Table';

interface SampleData {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

const sampleData: SampleData[] = [
  { id: 1, name: '山田太郎', email: 'yamada@example.com', role: 'エンジニア', status: '在籍' },
  { id: 2, name: '鈴木花子', email: 'suzuki@example.com', role: 'デザイナー', status: '在籍' },
  { id: 3, name: '田中一郎', email: 'tanaka@example.com', role: 'マネージャー', status: '休職' },
  { id: 4, name: '佐藤美咲', email: 'sato@example.com', role: 'エンジニア', status: '在籍' },
];

const columns = [
  { key: 'name', label: '名前', sortable: true },
  { key: 'email', label: 'メール' },
  { key: 'role', label: '役割', sortable: true },
  { key: 'status', label: 'ステータス', sortable: true },
];

const meta = {
  title: 'Shared/Table',
  component: Table<SampleData>,
  tags: ['autodocs'],
} satisfies Meta<typeof Table<SampleData>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    columns,
    data: sampleData,
  },
};

export const Selectable: Story = {
  args: {
    columns,
    data: sampleData,
    selectable: true,
    onSelectionChange: fn(),
  },
};

export const WithActions: Story = {
  args: {
    columns,
    data: sampleData,
    actions: [
      { label: '編集', onClick: fn() },
      { label: '削除', onClick: fn(), variant: 'danger' as const },
    ],
  },
};

export const Empty: Story = {
  args: {
    columns,
    data: [],
    emptyMessage: 'データがありません',
  },
};

export const CustomEmptyMessage: Story = {
  args: {
    columns,
    data: [],
    emptyMessage: 'スタッフが登録されていません',
  },
};

export const WithCustomRender: Story = {
  args: {
    columns: [
      ...columns.slice(0, 3),
      {
        key: 'status',
        label: 'ステータス',
        sortable: true,
        render: (item: SampleData) => (
          <span
            style={{
              padding: '2px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              backgroundColor: item.status === '在籍' ? '#dcfce7' : '#fef3c7',
              color: item.status === '在籍' ? '#166534' : '#92400e',
            }}
          >
            {item.status}
          </span>
        ),
      },
    ],
    data: sampleData,
  },
};
