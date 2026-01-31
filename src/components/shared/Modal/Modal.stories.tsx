import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Modal } from './Modal';

const meta = {
  title: 'Shared/Modal',
  component: Modal,
  tags: ['autodocs'],
  args: {
    onClose: fn(),
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    title: 'モーダルタイトル',
    children: 'モーダルのコンテンツがここに表示されます。',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const dialog = canvas.getByRole('dialog');
    await expect(dialog).toBeInTheDocument();
    await expect(dialog).toHaveAttribute('aria-modal', 'true');
    await expect(canvas.getByText('モーダルタイトル')).toBeInTheDocument();
    await expect(canvas.getByText('モーダルのコンテンツがここに表示されます。')).toBeInTheDocument();
  },
};

export const Small: Story = {
  args: {
    isOpen: true,
    title: '確認',
    size: 'sm',
    children: 'この操作を実行してもよろしいですか？',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('dialog')).toBeInTheDocument();
    await expect(canvas.getByText('確認')).toBeInTheDocument();
  },
};

export const Large: Story = {
  args: {
    isOpen: true,
    title: '詳細情報',
    size: 'lg',
    children: (
      <div>
        <p>大きなモーダルです。より多くのコンテンツを表示できます。</p>
        <p>フォームやテーブルなど、複雑なコンテンツに適しています。</p>
      </div>
    ),
  },
};

export const ExtraLarge: Story = {
  args: {
    isOpen: true,
    title: 'プレビュー',
    size: 'xl',
    children: 'XLサイズのモーダルです。画像プレビューなどに使用します。',
  },
};

export const WithoutTitle: Story = {
  args: {
    isOpen: true,
    children: 'タイトルなしのモーダルです。',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const dialog = canvas.getByRole('dialog');
    await expect(dialog).not.toHaveAttribute('aria-labelledby');
  },
};

export const CloseButton: Story = {
  args: {
    isOpen: true,
    title: '閉じるテスト',
    children: '閉じるボタンのテストです。',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const closeButton = canvas.getByRole('button', { name: '閉じる' });
    await expect(closeButton).toBeInTheDocument();
    await userEvent.click(closeButton);
    await expect(args.onClose).toHaveBeenCalledOnce();
  },
};

export const NoOverlayClose: Story = {
  args: {
    isOpen: true,
    title: 'オーバーレイクリック無効',
    closeOnOverlay: false,
    children: 'オーバーレイをクリックしても閉じません。',
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    title: '非表示',
    children: 'このモーダルは閉じています。',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const dialog = canvas.queryByRole('dialog');
    await expect(dialog).toBeNull();
  },
};
