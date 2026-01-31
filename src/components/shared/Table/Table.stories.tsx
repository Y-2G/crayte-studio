import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('山田太郎')).toBeInTheDocument();
    await expect(canvas.getByText('鈴木花子')).toBeInTheDocument();
    await expect(canvas.getByText('田中一郎')).toBeInTheDocument();
    await expect(canvas.getByText('佐藤美咲')).toBeInTheDocument();
    // Verify column headers
    await expect(canvas.getByText('名前')).toBeInTheDocument();
    await expect(canvas.getByText('メール')).toBeInTheDocument();
    await expect(canvas.getByText('役割')).toBeInTheDocument();
    await expect(canvas.getByText('ステータス')).toBeInTheDocument();
  },
};

export const Sortable: Story = {
  args: {
    columns,
    data: sampleData,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Click sortable column header to sort
    const nameHeader = canvas.getByText('名前');
    await userEvent.click(nameHeader);
    // After sort, verify sort indicator appears
    await expect(canvas.getByText('▲')).toBeInTheDocument();
    // Click again to toggle sort order
    await userEvent.click(nameHeader);
    await expect(canvas.getByText('▼')).toBeInTheDocument();
  },
};

export const Selectable: Story = {
  args: {
    columns,
    data: sampleData,
    selectable: true,
    onSelectionChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const checkboxes = canvas.getAllByRole('checkbox');
    // Should have 5 checkboxes (1 for select all + 4 for rows)
    await expect(checkboxes).toHaveLength(5);
    // Click first row checkbox
    await userEvent.click(checkboxes[1]);
    await expect(args.onSelectionChange).toHaveBeenCalled();
    // Click select all
    await userEvent.click(checkboxes[0]);
    await expect(args.onSelectionChange).toHaveBeenCalled();
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('操作')).toBeInTheDocument();
    const editButtons = canvas.getAllByText('編集');
    await expect(editButtons).toHaveLength(4);
    const deleteButtons = canvas.getAllByText('削除');
    await expect(deleteButtons).toHaveLength(4);
  },
};

export const Empty: Story = {
  args: {
    columns,
    data: [],
    emptyMessage: 'データがありません',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('データがありません')).toBeInTheDocument();
  },
};

export const CustomEmptyMessage: Story = {
  args: {
    columns,
    data: [],
    emptyMessage: 'スタッフが登録されていません',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('スタッフが登録されていません')).toBeInTheDocument();
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByText('在籍')).toHaveLength(3);
    await expect(canvas.getByText('休職')).toBeInTheDocument();
  },
};
