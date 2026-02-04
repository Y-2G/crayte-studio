import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CommentsSection } from './CommentsSection';
import type { Comment } from '@/types/entities';

const meta = {
  title: 'Admin/CommentsSection',
  component: CommentsSection,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CommentsSection>;

export default meta;
type Story = StoryObj<typeof meta>;

const normalComments: Comment[] = [
  {
    id: 'comment-001',
    postId: 'post-003',
    author: '山田太郎',
    email: 'yamada@example.com',
    content: 'とても興味深い記事でした。次回作も楽しみにしています!',
    status: 'approved',
    createdAt: '2024-03-15T14:30:00Z',
  },
  {
    id: 'comment-002',
    postId: 'post-003',
    author: '田中花子',
    email: 'tanaka.hanako@example.com',
    content: 'プロジェクトの詳細についてもう少し知りたいです。続編の記事を期待しています。',
    status: 'pending',
    createdAt: '2024-03-16T09:15:00Z',
  },
];

const horrorComment: Comment = {
  id: 'comment-004',
  postId: 'post-002',
  author: '？？？',
  email: 'void@crayte.studio',
  content:
    'もう手遅れです。全てが書き換えられる前に、逃げてください。あなたが見ているものは既に「それ」ではありません。',
  status: 'pending',
  createdAt: '2024-02-29T03:33:33Z',
};

/**
 * Default state with normal comments
 */
export const Default: Story = {
  args: {
    comments: normalComments,
    postId: 'post-003',
  },
};

/**
 * Empty state with no comments
 */
export const Empty: Story = {
  args: {
    comments: [],
    postId: 'post-001',
  },
};

/**
 * Horror state with anomalous comment
 */
export const WithHorror: Story = {
  args: {
    comments: [normalComments[0], horrorComment, normalComments[1]],
    postId: 'post-002',
  },
};

/**
 * Multiple statuses demonstration
 */
export const MultipleStatuses: Story = {
  args: {
    comments: [
      {
        id: 'comment-approved',
        postId: 'post-001',
        author: '承認済みコメント',
        email: 'approved@example.com',
        content: 'このコメントは承認済みです。',
        status: 'approved',
        createdAt: '2024-03-10T10:00:00Z',
      },
      {
        id: 'comment-pending',
        postId: 'post-001',
        author: '保留中コメント',
        email: 'pending@example.com',
        content: 'このコメントは保留中です。',
        status: 'pending',
        createdAt: '2024-03-11T11:00:00Z',
      },
      {
        id: 'comment-spam',
        postId: 'post-001',
        author: 'スパムコメント',
        email: 'spam@example.com',
        content: 'このコメントはスパムとしてマークされています。',
        status: 'spam',
        createdAt: '2024-03-12T12:00:00Z',
      },
      {
        id: 'comment-trash',
        postId: 'post-001',
        author: 'ゴミ箱コメント',
        email: 'trash@example.com',
        content: 'このコメントはゴミ箱に入っています。',
        status: 'trash',
        createdAt: '2024-03-13T13:00:00Z',
      },
    ],
    postId: 'post-001',
  },
};
