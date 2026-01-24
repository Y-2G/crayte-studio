# Data Layer

obserq-studio プロジェクトのデータアクセス層です。

## 概要

このディレクトリには、JSON ファイルからデータを読み込むための関数が含まれています。
全てのデータアクセスは `async` 関数として実装されており、将来的に API や DB に移行する際にも、呼び出し側のコードを変更する必要がありません。

## ファイル構成

```
src/lib/data/
├── index.ts          # 全ての関数をエクスポート
├── posts.ts          # ニュース・記事データ
├── works.ts          # 実績データ
├── staff.ts          # スタッフデータ
├── pages.ts          # 固定ページデータ
└── inbox.ts          # お問い合わせ受信データ
```

## 使用方法

### 基本的な使用例

```typescript
import {
  getPublishedPosts,
  getActiveStaff,
  getPublicWorks
} from '@/lib/data';

// 公開済みの記事を取得
const posts = await getPublishedPosts();

// アクティブなスタッフを取得
const staff = await getActiveStaff();

// 公開可能な実績を取得
const works = await getPublicWorks();
```

### フィルタリング

```typescript
import {
  getPostsByCategory,
  getWorksByTag,
  getStaffByTeam
} from '@/lib/data';

// カテゴリでフィルタ
const news = await getPostsByCategory('お知らせ');

// タグでフィルタ
const eventWorks = await getWorksByTag('イベント');

// チームでフィルタ
const productionTeam = await getStaffByTeam('制作');
```

### 単一アイテムの取得

```typescript
import {
  getPostBySlug,
  getWorkBySlug,
  getStaffBySlug
} from '@/lib/data';

// slug で特定の記事を取得
const post = await getPostBySlug('new-office-announcement');

// slug で特定の実績を取得
const work = await getWorkBySlug('summer-festival-2023');

// slug で特定のスタッフを取得
const staff = await getStaffBySlug('tanaka-ichiro');
```

## データソース

現在、データは以下の JSON ファイルから読み込まれます。

- `/src/data/posts.json` - ニュース・記事 (7件)
- `/src/data/works.json` - 実績 (7件)
- `/src/data/staff.json` - スタッフ (7名)
- `/src/data/pages.json` - 固定ページ (5件)
- `/src/data/inbox.json` - お問い合わせ (5件)

## 注意事項

### ホラー要素を含むデータ

一部のデータには、ARG (代替現実ゲーム) の一環としてホラー要素が含まれています。

- **Posts**: `post-006` (draft, ホラー要素含む)
- **Works**: `work-006` (sealed, 封印済み)
- **Staff**: `staff-007` (missing, 行方不明)
- **Inbox**: `inbox-005` (sign, 異常な兆候)

これらのデータは、通常の公開関数 (`getPublishedPosts()`, `getActiveStaff()` など) では除外されます。

### 公開用 vs 管理用

- **公開用関数**: `getPublishedPosts()`, `getActiveStaff()`, `getPublicWorks()`
  - 公開サイトで表示すべきデータのみを返す
  - ホラー要素は除外される

- **管理用関数**: `getAllPosts()`, `getAllStaff()`, `getAllWorks()`
  - 管理画面で全データを表示するために使用
  - ホラー要素を含む全てのデータを返す

## 型定義

全てのデータ型は `/src/types/` で定義されています。

```typescript
import type { Post, Work, Staff, Page, InboxMessage } from '@/types';
```
