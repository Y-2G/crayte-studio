# 共通UIコンポーネント

obserq-studio プロジェクトの共通UIコンポーネントライブラリ。

## 使用方法

```tsx
import { Button, Card, Input, Table } from '@/components/shared';
```

---

## Button

ボタンコンポーネント。4つのバリアントと3つのサイズをサポート。

### Props

```tsx
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  className?: string;
}
```

### 使用例

```tsx
<Button variant="primary" size="md" onClick={() => alert('クリック')}>
  送信
</Button>

<Button variant="danger" loading>
  削除中...
</Button>
```

---

## Card

カードレイアウトコンポーネント。Header, Body, Footer のサブコンポーネントあり。

### Props

```tsx
interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'bordered';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
}
```

### 使用例

```tsx
<Card variant="elevated" padding="md">
  <CardHeader>タイトル</CardHeader>
  <CardBody>
    <p>コンテンツ</p>
  </CardBody>
  <CardFooter>
    <Button>アクション</Button>
  </CardFooter>
</Card>
```

---

## Input / Textarea

フォーム入力コンポーネント。エラー表示とヒント表示をサポート。

### Props

```tsx
interface InputProps {
  label?: string;
  error?: string;
  hint?: string;
  fullWidth?: boolean;
  // ...その他のHTML input属性
}
```

### 使用例

```tsx
<Input
  label="メールアドレス"
  type="email"
  placeholder="example@example.com"
  error="有効なメールアドレスを入力してください"
  fullWidth
/>

<Textarea
  label="メッセージ"
  hint="200文字以内で入力してください"
  rows={5}
  fullWidth
/>
```

---

## Table

データテーブルコンポーネント。ソート、選択、アクションボタンをサポート。

### Props

```tsx
interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  actions?: TableAction<T>[];
  selectable?: boolean;
  onSelectionChange?: (selected: T[]) => void;
  className?: string;
  emptyMessage?: string;
}
```

### 使用例

```tsx
const columns = [
  { key: 'id', label: 'ID', sortable: true, width: '80px' },
  { key: 'title', label: 'タイトル', sortable: true },
  {
    key: 'status',
    label: 'ステータス',
    render: (item) => <Badge variant={item.status === 'published' ? 'success' : 'default'}>{item.status}</Badge>
  },
];

const actions = [
  { label: '編集', onClick: (item) => handleEdit(item) },
  { label: '削除', onClick: (item) => handleDelete(item), variant: 'danger' },
];

<Table
  columns={columns}
  data={posts}
  actions={actions}
  selectable
  onSelectionChange={(selected) => console.log(selected)}
/>
```

---

## Modal

モーダルダイアログコンポーネント。ESCキーとオーバーレイクリックで閉じる機能あり。

### Props

```tsx
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeOnOverlay?: boolean;
  closeOnEsc?: boolean;
}
```

### 使用例

```tsx
const [isOpen, setIsOpen] = useState(false);

<Button onClick={() => setIsOpen(true)}>開く</Button>

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="確認"
  size="md"
>
  <p>本当に削除しますか？</p>
  <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
    <Button variant="danger" onClick={handleDelete}>削除</Button>
    <Button variant="ghost" onClick={() => setIsOpen(false)}>キャンセル</Button>
  </div>
</Modal>
```

---

## Loading (Spinner / Skeleton)

ローディング表示コンポーネント。

### Spinner Props

```tsx
interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'white';
  className?: string;
}
```

### Skeleton Props

```tsx
interface SkeletonProps {
  variant?: 'text' | 'rectangular' | 'circular';
  width?: string | number;
  height?: string | number;
  className?: string;
}
```

### 使用例

```tsx
// スピナー
<Spinner size="md" color="primary" />

// スケルトン（テキスト）
<Skeleton variant="text" width="100%" />
<Skeleton variant="text" width="80%" />

// スケルトン（画像）
<Skeleton variant="rectangular" width="100%" height={200} />

// スケルトン（アバター）
<Skeleton variant="circular" width={40} height={40} />
```

---

## Badge

バッジ/ラベルコンポーネント。

### Props

```tsx
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md';
  className?: string;
}
```

### 使用例

```tsx
<Badge variant="success">公開中</Badge>
<Badge variant="warning">下書き</Badge>
<Badge variant="error">削除済み</Badge>
<Badge variant="info" size="sm">新着</Badge>
```

---

## CSS Variables

すべてのコンポーネントは `/src/styles/variables.css` で定義された CSS Variables を使用しています。

### 主要な変数

- **カラー**: `--public-primary`, `--admin-primary`, `--admin-error`, etc.
- **スペーシング**: `--spacing-1` (4px) ～ `--spacing-20` (80px)
- **フォントサイズ**: `--font-size-xs` ～ `--font-size-4xl`
- **ボーダー半径**: `--border-radius-sm` ～ `--border-radius-xl`
- **シャドウ**: `--shadow-sm` ～ `--shadow-xl`
- **トランジション**: `--transition-fast`, `--transition-normal`, `--transition-slow`

---

## アクセシビリティ

すべてのコンポーネントはWCAG 2.1準拠を目指して実装されています。

- キーボード操作対応
- 適切なARIA属性
- フォーカス表示
- スクリーンリーダー対応

---

## レスポンシブデザイン

すべてのコンポーネントはモバイルファーストで設計されており、以下のブレークポイントに対応しています。

- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px
