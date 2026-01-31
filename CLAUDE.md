# CLAUDE.md - crayte-studio

## Project Overview

Crayte Studio は、公開サイト（表）とWordPress風管理画面（裏）の二層構造を持つ Next.js アプリケーション。ホラーARG要素を組み込んだコーポレートサイト + CMS。

## Tech Stack

- **Next.js 16.1.4** - App Router（Pages Router不使用）
- **React 19.2.3** - React Compiler 有効（`reactCompiler: true`）
- **TypeScript 5** - strict mode
- **CSS Modules** + CSS Custom Properties（UIライブラリ不使用、独自コンポーネント）
- **Vitest 4** + Playwright - テスト（Storybook連携）
- **Storybook 10** - コンポーネントカタログ
- **Markdown** - 記事コンテンツ（gray-matter + marked）

## Directory Structure

```
src/
├── app/
│   ├── (public)/          # 公開サイトのルート群（/, /articles, /works, /members 等）
│   └── admin/             # 管理画面（/admin/posts, /admin/media, /admin/settings 等）
├── components/
│   ├── public/            # 公開サイト用（Header, Footer, HeroVideo, WorksGallery 等）
│   ├── admin/             # 管理画面用（Sidebar, PostsTable, MetaBox, Widget 等）
│   ├── shared/            # 共通（Button, Card, Input, Table, Modal, Badge, Loading）
│   └── icons/             # アイコンコンポーネント
├── lib/
│   ├── data/              # データアクセス層（posts.ts, works.ts, staff.ts 等）
│   ├── horror/            # ホラーシステム（state.ts, filters.ts, utils.ts）
│   └── utils/             # ユーティリティ
├── types/                 # 型定義（entities.ts, horror.ts, ui.ts）
├── styles/                # グローバルCSS（globals.css, variables.css, admin.css）
├── data/                  # JSON モックデータ
└── content/articles/      # Markdown 記事ファイル
```

## Key Conventions

### Path Alias
- `@/*` → `./src/*`

### Component Structure
各コンポーネントは以下のファイル構成:
```
ComponentName/
├── ComponentName.tsx
├── ComponentName.module.css
├── ComponentName.stories.tsx
└── index.ts              # barrel export
```

### Naming
- コンポーネント・型: PascalCase
- ファイル: コンポーネントは PascalCase、ユーティリティは camelCase
- CSS変数: `--[category]-[property]`（例: `--public-primary`, `--font-size-sm`）

### Styling
- CSS Modules でコンポーネントスコープ
- `src/styles/variables.css` にデザイントークン集約（色、スペーシング、フォント、影等）
- 外部 UI ライブラリ不使用。全コンポーネント自前実装
- `clsx` でクラス名の条件結合

### Data Layer
- `src/data/` の JSON ファイルがデータソース（モック）
- `src/lib/data/` に CRUD 関数（`getAllPosts()`, `getPostBySlug()` 等）
- 各モジュールは `index.ts` で集約エクスポート

### Type System
- `src/types/entities.ts` - コアエンティティ（Post, Work, Staff, Page, Media, Comment, InboxMessage）
- `src/types/horror.ts` - ホラーシステム型（AnomalyLevel, HorrorState 等）
- `src/types/ui.ts` - UI型（TableColumn, FormField, ModalProps 等）
- カスタム型ガード関数を活用（`isPost()`, `isHorrorMeta()` 等）

### Status Enums
- Post: `draft | pending | publish | rejected | leak`
- Work: `planned | live | closed | sealed | rewritten`
- Staff: `active | suspended | missing`
- Anomaly: `none | subtle | noticeable | severe`

## Commands

```bash
yarn dev              # 開発サーバー (localhost:3000)
yarn build            # プロダクションビルド
yarn lint             # ESLint
yarn test             # Vitest (watch mode)
yarn test:run         # Vitest (single run)
yarn storybook        # Storybook (localhost:6006)
```

## Fonts

- **Geist Sans / Geist Mono** - next/font/google 経由、CSS変数 `--font-geist-sans`, `--font-geist-mono`
- **Syne** - ディスプレイフォント、weight 400-800、CSS変数 `--font-syne`

## Remote Images

- Unsplash (`images.unsplash.com`) のみ許可（next.config.ts）

## Architecture Notes

- **二層構造**: `(public)` ルートグループが公開サイト、`admin/` が管理画面
- **Horror System**: `lib/horror/` でアノマリーレベルの進行・封印・書き換えを管理
- **Server Components優先**: データ取得は Server Component で行い、Client Component は UI 状態管理のみ
- **グローバル状態管理ライブラリ不使用**: useState + props + Server Components で完結
