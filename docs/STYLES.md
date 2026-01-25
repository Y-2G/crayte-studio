# スタイル基盤ドキュメント

## 概要

crayte-studio プロジェクトのスタイルシステムは、公開サイト（表）と管理画面（裏）で異なるテーマを提供し、段階的にホラー要素を追加できるよう設計されています。

## ファイル構成

```
src/styles/
├── variables.css  - CSS変数の定義
├── reset.css      - リセットスタイル
├── globals.css    - グローバルスタイル（公開サイト用）
└── admin.css      - 管理画面用スタイル
```

## 使用方法

### 公開サイト（表）のスタイル

通常のページでは自動的に公開サイト用のスタイルが適用されます。

```tsx
// src/app/page.tsx
export default function Page() {
  return (
    <div style={{
      backgroundColor: 'var(--public-bg)',
      color: 'var(--public-text)'
    }}>
      コンテンツ
    </div>
  );
}
```

### 管理画面（裏）のスタイル

管理画面では `admin-layout` クラスを body または最上位要素に追加します。

```tsx
// src/app/admin/layout.tsx
import '@/styles/admin.css';

export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      {children}
    </div>
  );
}
```

## CSS変数一覧

### 公開サイトカラー

- `--public-primary`: メインカラー（#2563eb）
- `--public-primary-dark`: ダークバリエーション
- `--public-secondary`: セカンダリカラー
- `--public-accent`: アクセントカラー
- `--public-bg`: 背景色
- `--public-bg-alt`: 代替背景色
- `--public-text`: テキスト色
- `--public-text-muted`: 薄めのテキスト色
- `--public-border`: ボーダー色

### 管理画面カラー（WordPress風）

- `--admin-primary`: WP青（#2271b1）
- `--admin-primary-dark`: ダークバリエーション
- `--admin-secondary`: セカンダリカラー
- `--admin-bg`: 背景色（#f0f0f1）
- `--admin-bg-dark`: ダーク背景
- `--admin-sidebar`: サイドバー色
- `--admin-sidebar-text`: サイドバーテキスト色
- `--admin-sidebar-hover`: サイドバーホバー色
- `--admin-text`: テキスト色
- `--admin-text-muted`: 薄めのテキスト色
- `--admin-border`: ボーダー色
- `--admin-success`: 成功色
- `--admin-warning`: 警告色
- `--admin-error`: エラー色

### ホラー要素カラー

段階的にホラー要素を追加できる変数を用意しています。

- `--horror-subtle`: 微妙なホラー効果（rgba(139, 0, 0, 0.05)）
- `--horror-noticeable`: 気づきやすい効果（rgba(139, 0, 0, 0.15)）
- `--horror-severe`: 強い効果（rgba(139, 0, 0, 0.3)）
- `--horror-text`: ホラーテキスト色（#8b0000）
- `--horror-glow`: 不気味なグロウエフェクト

使用例:

```css
/* 通常状態 */
.element {
  background: var(--admin-bg);
  transition: background var(--transition-normal);
}

/* ホラー効果を段階的に適用 */
.element.horror-1 {
  background: var(--horror-subtle);
}

.element.horror-2 {
  background: var(--horror-noticeable);
  box-shadow: var(--horror-glow);
}

.element.horror-3 {
  background: var(--horror-severe);
  color: var(--horror-text);
  box-shadow: var(--horror-glow);
}
```

### タイポグラフィ

- `--font-sans`: サンセリフフォント
- `--font-mono`: 等幅フォント
- `--font-size-xs` ～ `--font-size-4xl`: フォントサイズ
- `--font-weight-normal` ～ `--font-weight-bold`: フォントウェイト
- `--line-height-tight` ～ `--line-height-relaxed`: 行間

### スペーシング

- `--spacing-0` ～ `--spacing-20`: 0から80pxまでのスペーシング

### ボーダー

- `--border-radius-sm` ～ `--border-radius-full`: ボーダー半径

### シャドウ

- `--shadow-sm` ～ `--shadow-xl`: シャドウ

### トランジション

- `--transition-fast`: 150ms
- `--transition-normal`: 250ms
- `--transition-slow`: 350ms

### Z-Index

- `--z-dropdown`: 100
- `--z-sticky`: 200
- `--z-modal`: 300
- `--z-tooltip`: 400

### 管理画面固有の変数

- `--admin-sidebar-width`: 160px
- `--admin-sidebar-collapsed-width`: 36px
- `--admin-header-height`: 32px
- `--admin-content-max-width`: 1200px

## レスポンシブデザイン

ブレークポイントは以下の通りです（CSS変数では定義していませんが、参照用として記載）。

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

使用例:

```css
.container {
  padding: var(--spacing-4);
}

@media (min-width: 768px) {
  .container {
    padding: var(--spacing-8);
  }
}
```

## アクセシビリティ

- フォーカス表示は `:focus-visible` で実装
- プリファード・リデュースド・モーションに対応
- セマンティックHTMLの使用を推奨
- 適切なコントラスト比を確保

## 注意事項

1. CSS変数を直接変更せず、必要に応じて上書きする
2. ホラー要素は段階的に適用し、ユーザー体験を損なわないように
3. 管理画面ではWordPress風のUIを維持する
4. カスタムプロパティは常に `var()` 関数を使用してアクセスする
