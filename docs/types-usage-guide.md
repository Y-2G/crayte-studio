# 型定義使用ガイド

CRAYTE STUDIO プロジェクトの型定義の使用方法を説明します。

## 基本的なインポート

```typescript
// すべての型をインポート
import type { Post, Work, Staff, HorrorMeta, NavItem } from "@/types";

// 特定のファイルから直接インポート
import type { Post, PostStatus } from "@/types/entities";
import type { AnomalyLevel, HorrorState } from "@/types/horror";
import type { TableColumn, FormField } from "@/types/ui";
```

## エンティティ型の使用例

### Post（記事・ニュース）

```typescript
import type { Post, PostStatus } from "@/types";

// 新規投稿の作成
const createNewPost = (): Post => {
  return {
    id: generateId(),
    slug: "new-post",
    title: "新しい記事",
    content: "記事の内容...",
    excerpt: "要約",
    status: "draft",
    visibility: "public",
    category: "news",
    tags: ["tag1", "tag2"],
    author: "author-id",
    reviewComments: [],
    meta: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

// ステータス変更
const publishPost = (post: Post): Post => {
  return {
    ...post,
    status: "publish",
    publishedAt: new Date().toISOString(),
  };
};

// 型ガードの使用
import { isPost } from "@/types";

const data: unknown = fetchData();
if (isPost(data)) {
  console.log(data.title); // 型安全にアクセス可能
}
```

### Work（制作実績・ポートフォリオ）

```typescript
import type { Work, WorkStatus } from "@/types";

const createWork = (): Work => {
  return {
    id: generateId(),
    slug: "project-name",
    title: "プロジェクト名",
    description: "プロジェクトの説明",
    client: "クライアント名",
    venue: "会場",
    date: "2024-01-01",
    status: "live",
    images: ["/image1.jpg", "/image2.jpg"],
    tags: ["tag1"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

// ステータスのフィルタリング
const getLiveWorks = (works: Work[]): Work[] => {
  return works.filter((work) => work.status === "live");
};
```

### Staff（スタッフ）

```typescript
import type { Staff, StaffState } from "@/types";

const createStaff = (): Staff => {
  return {
    id: generateId(),
    slug: "john-doe",
    name: "John Doe",
    role: "Designer",
    team: "Creative",
    bio: "経歴...",
    photo: "/photos/john.jpg",
    visibility: "public",
    state: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

// スタッフの状態変更（ホラー要素）
const markStaffMissing = (staff: Staff): Staff => {
  return {
    ...staff,
    state: "missing",
    removedReason: "所在不明",
  };
};
```

### InboxMessage（お問い合わせ）

```typescript
import type { InboxMessage, InboxCategory, InboxSeverity } from "@/types";

const createInboxMessage = (formData: FormData): InboxMessage => {
  return {
    id: generateId(),
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    subject: formData.get("subject") as string,
    message: formData.get("message") as string,
    category: "general",
    severity: "low",
    status: "open",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

// 重要度に応じた処理
const handleUrgentMessages = (messages: InboxMessage[]): InboxMessage[] => {
  return messages.filter((msg) => msg.severity === "high");
};
```

## ホラー型の使用例

### HorrorMeta（ホラー要素のメタデータ）

```typescript
import type { Post, HorrorMeta } from "@/types";

// ホラー要素を含む投稿
const createAnomalousPost = (): Post => {
  const horrorMeta: HorrorMeta = {
    anomalyLevel: "subtle",
    isSealed: false,
    isRewritten: false,
    observationNotes: ["投稿日時が不自然", "投稿者名が文字化け"],
  };

  return {
    id: generateId(),
    slug: "anomalous-post",
    title: "異常な投稿",
    content: "内容...",
    excerpt: "要約",
    status: "publish",
    visibility: "public",
    category: "news",
    tags: [],
    author: "unknown",
    reviewComments: [],
    meta: horrorMeta, // ホラーメタデータを埋め込み
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

// メタデータの検証
import { hasHorrorMeta } from "@/types/horror";

const checkForAnomalies = (post: Post): boolean => {
  return hasHorrorMeta(post.meta);
};
```

### AnomalyEvent（異常イベント）

```typescript
import type { AnomalyEvent, AnomalyEventType } from "@/types";

const createAnomalyEvent = (
  targetId: string,
  type: AnomalyEventType,
): AnomalyEvent => {
  return {
    id: generateId(),
    type,
    level: "subtle",
    targetId,
    targetType: "post",
    description: "テキストにグリッチが発生",
    metadata: {
      originalText: "元のテキスト",
      glitchedText: "元の�キス�",
    },
    occurredAt: new Date().toISOString(),
    isObserved: false,
  };
};

// 異常レベルの進行
import { getNextAnomalyLevel, isMoreSevere } from "@/types/horror";

const progressAnomaly = (event: AnomalyEvent): AnomalyEvent => {
  const nextLevel = getNextAnomalyLevel(event.level);
  if (nextLevel) {
    return { ...event, level: nextLevel };
  }
  return event;
};
```

### HorrorState（グローバルホラー状態）

```typescript
import type { HorrorState, AnomalyLevel } from "@/types";

// 初期状態
const initialHorrorState: HorrorState = {
  currentLevel: "none",
  exposedAnomalies: [],
  sealedContentIds: [],
  rewrittenContentIds: [],
};

// 状態の更新
const updateHorrorState = (
  state: HorrorState,
  anomalyId: string,
): HorrorState => {
  return {
    ...state,
    exposedAnomalies: [...state.exposedAnomalies, anomalyId],
  };
};

// コンテンツの封印
const sealContent = (state: HorrorState, contentId: string): HorrorState => {
  return {
    ...state,
    sealedContentIds: [...state.sealedContentIds, contentId],
    currentLevel: "noticeable",
  };
};
```

## UI 型の使用例

### TableColumn（テーブル列定義）

```typescript
import type { TableColumn, Post } from "@/types";

const postColumns: TableColumn<Post>[] = [
  {
    key: "title",
    label: "タイトル",
    sortable: true,
    width: "40%",
  },
  {
    key: "status",
    label: "ステータス",
    sortable: true,
    render: (value, row) => <StatusBadge status={value as PostStatus} />,
  },
  {
    key: "createdAt",
    label: "作成日",
    sortable: true,
    render: (value) => formatDate(value as string),
  },
];
```

### FormField（フォーム定義）

```typescript
import type { FormField } from "@/types";

const contactFormFields: FormField[] = [
  {
    name: "name",
    label: "名前",
    type: "text",
    required: true,
    placeholder: "お名前を入力",
  },
  {
    name: "email",
    label: "メールアドレス",
    type: "email",
    required: true,
    validation: (value) => {
      const email = value as string;
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ? undefined
        : "有効なメールアドレスを入力してください";
    },
  },
  {
    name: "category",
    label: "お問い合わせ種別",
    type: "select",
    required: true,
    options: [
      { value: "general", label: "一般" },
      { value: "press", label: "取材依頼" },
      { value: "quote", label: "見積依頼" },
    ],
  },
  {
    name: "message",
    label: "メッセージ",
    type: "textarea",
    required: true,
    maxLength: 1000,
  },
];
```

### NavItem（ナビゲーション）

```typescript
import type { NavItem } from "@/types";

// 表サイト用ナビゲーション
const publicNavigation: NavItem[] = [
  {
    label: "ホーム",
    href: "/",
    icon: "home",
  },
  {
    label: "制作実績",
    href: "/works",
    icon: "portfolio",
  },
  {
    label: "会社概要",
    href: "/about",
    icon: "info",
    children: [
      { label: "会社情報", href: "/about/company" },
      { label: "スタッフ紹介", href: "/about/staff" },
    ],
  },
];

// 管理画面用サイドバー
import type { SidebarItem } from "@/types";

const adminSidebar: SidebarItem[] = [
  {
    id: "dashboard",
    label: "ダッシュボード",
    href: "/admin",
    icon: "dashboard",
    isActive: true,
  },
  {
    id: "posts",
    label: "投稿",
    href: "/admin/posts",
    icon: "document",
    badge: 5, // 下書き数
  },
  {
    id: "inbox",
    label: "受信箱",
    href: "/admin/inbox",
    icon: "mail",
    badge: 3, // 未読数
  },
];
```

### Pagination（ページネーション）

```typescript
import type { Pagination, PaginationChangeParams } from "@/types";

const usePagination = () => {
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    perPage: 10,
    total: 100,
    totalPages: 10,
  });

  const handlePageChange = (params: PaginationChangeParams) => {
    setPagination((prev) => ({
      ...prev,
      page: params.page,
      perPage: params.perPage ?? prev.perPage,
    }));
  };

  return { pagination, handlePageChange };
};
```

## Server Actions での使用例

```typescript
"use server";

import type { Post, PostStatus } from "@/types";
import { revalidatePath } from "next/cache";

export async function updatePostStatus(
  postId: string,
  status: PostStatus,
): Promise<{ success: boolean; post?: Post; error?: string }> {
  try {
    // Firestore への更新
    const updatedPost = await updatePost(postId, { status });

    revalidatePath("/admin/posts");

    return { success: true, post: updatedPost };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
```

## React コンポーネントでの使用例

```typescript
import type { Post, TableColumn, TableAction } from "@/types";

interface PostTableProps {
  posts: Post[];
}

export default function PostTable({ posts }: PostTableProps) {
  const columns: TableColumn<Post>[] = [
    { key: "title", label: "タイトル", sortable: true },
    { key: "status", label: "ステータス", sortable: true },
  ];

  const actions: TableAction<Post>[] = [
    {
      label: "編集",
      onClick: (post) => router.push(`/admin/posts/${post.id}`),
      icon: "edit",
      variant: "default",
    },
    {
      label: "削除",
      onClick: (post) => handleDelete(post.id),
      icon: "trash",
      variant: "danger",
      confirmMessage: "本当に削除しますか？",
    },
  ];

  return <DataTable data={posts} columns={columns} actions={actions} />;
}
```

## 型の拡張

プロジェクト固有の型が必要な場合は、既存の型を拡張できます。

```typescript
// カスタム型の定義
import type { Post, HorrorMeta } from "@/types";

// Post を拡張した型
interface EnhancedPost extends Post {
  viewCount: number;
  shareCount: number;
}

// HorrorMeta を拡張した型
interface DetailedHorrorMeta extends HorrorMeta {
  investigationNotes: string[];
  linkedAnomalies: string[];
}
```

## ベストプラクティス

1. **常に型をインポートする**: `import type` を使用して型のみをインポート
2. **型ガードを活用**: 不明な型のデータを扱う際は型ガードを使用
3. **型を拡張**: 必要に応じて既存の型を拡張し、プロジェクト固有の型を定義
4. **strict モード**: TypeScript の strict モードは常に有効にする
5. **型の再利用**: 共通の型定義を再利用し、DRY 原則を守る

## トラブルシューティング

### 型エラーが出る場合

```typescript
// ❌ 悪い例
const post = data; // any 型になる

// ✅ 良い例
import type { Post } from "@/types";
import { isPost } from "@/types";

if (isPost(data)) {
  const post: Post = data; // 型安全
}
```

### 部分的な型が必要な場合

```typescript
import type { Post } from "@/types";

// 一部のフィールドのみ必須
type PostDraft = Pick<Post, "title" | "content" | "author">;

// 一部のフィールドをオプショナルに
type PartialPost = Partial<Post>;

// 特定のフィールドを除外
type PostWithoutMeta = Omit<Post, "meta">;
```
