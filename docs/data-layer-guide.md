# データ層実装ガイド

crayte-studio プロジェクトのデータ層とサンプルデータに関するドキュメントです。

## 作成されたファイル

### 1. サンプルデータ (JSON)

**場所**: `/src/data/`

| ファイル     | 内容                 | 件数 | ホラー要素                                     |
| ------------ | -------------------- | ---- | ---------------------------------------------- |
| `posts.json` | ニュース・記事       | 7件  | post-006 (draft, スタッフ失踪に関する内部文書) |
| `works.json` | 実績・ポートフォリオ | 7件  | work-006 (sealed, 封印されたプロジェクト)      |
| `staff.json` | スタッフ紹介         | 7名  | staff-007 (missing, 連絡が取れないスタッフ)    |
| `pages.json` | 固定ページ           | 5件  | なし                                           |
| `inbox.json` | お問い合わせ受信     | 5件  | inbox-005 (sign, 観察者からの警告)             |

### 2. データアクセス関数

**場所**: `/src/lib/data/`

| ファイル   | 主な関数                                                                               |
| ---------- | -------------------------------------------------------------------------------------- |
| `posts.ts` | `getPublishedPosts()`, `getPostBySlug()`, `getPostsByCategory()` など                  |
| `works.ts` | `getPublicWorks()`, `getWorkBySlug()`, `getWorksByTag()` など                          |
| `staff.ts` | `getActiveStaff()`, `getStaffBySlug()`, `getStaffByTeam()` など                        |
| `pages.ts` | `getPublishedPages()`, `getPageBySlug()`, `getPagesByTemplate()` など                  |
| `inbox.ts` | `getAllInboxMessages()`, `getOpenInboxMessages()`, `getInboxMessagesByCategory()` など |
| `index.ts` | 全関数の re-export                                                                     |

### 3. ホラー状態管理

**場所**: `/src/lib/horror/`

| ファイル     | 主な関数                                                                                          |
| ------------ | ------------------------------------------------------------------------------------------------- |
| `state.ts`   | `initHorrorState()`, `getAnomalyLevel()`, `exposeAnomaly()`, `shouldShowHorrorElement()` など     |
| `filters.ts` | `filterSealedPosts()`, `filterSealedWorks()`, `filterSealedStaff()`, `filterInboxMessages()` など |
| `index.ts`   | 全関数の re-export                                                                                |

## 会社設定（架空企業 CRAYTE STUDIO）

### 基本情報

- **社名**: 株式会社CRAYTE STUDIO（クレイトスタジオ）
- **設立**: 2015年1月
- **代表**: 田中 一郎
- **所在地**: 〒150-0002 東京都渋谷区渋谷2-21-1 渋谷ヒカリエ 15F
- **従業員数**: 約20名

### 事業内容

1. **Webサイト制作**: コーポレートサイト、ECサイト、採用サイトなど
2. **イベント企画・運営**: 企業イベント、展覧会、音楽フェスティバル、地域イベント
3. **映像制作**: プロモーション映像、ブランディング映像、イベント記録
4. **デジタルマーケティング**: SNS運用、コンテンツマーケティング、データ分析

### 企業理念

「観察する(observe)」ことから全てのプロジェクトを始める。クライアントのビジネス、ユーザーの行動、社会の変化を注意深く観察し、本質的な課題を発見して解決策を提供する。

### 主要スタッフ

1. **田中 一郎** - 代表取締役 (経営)
2. **鈴木 由紀** - クリエイティブディレクター (制作)
3. **佐藤 健二** - テクニカルディレクター (開発)
4. **山本 明子** - イベントプランナー (イベント)
5. **高橋 浩** - 映像ディレクター (制作)
6. **中村 恵理** - マーケティングプランナー (企画)
7. **小林 正人** - Webデザイナー (制作) ※行方不明

## ホラー要素の設計

### コンセプト

「気づかれないうちに世界が変わっている」という "uncanny" な恐怖。突然のジャンプスケアではなく、徐々に違和感が蓄積していく体験。

### 異常レベルの進行

| レベル         | 閲覧数 | 演出内容                                             |
| -------------- | ------ | ---------------------------------------------------- |
| **none**       | 0-1    | 正常な企業サイト                                     |
| **subtle**     | 2-4    | 微細な違和感（誤字、日付のズレ）                     |
| **noticeable** | 5-7    | 明確な異常（スタッフの失踪、封印されたプロジェクト） |
| **severe**     | 8+     | 重大な異常（謎のメッセージ、書き換えられた履歴）     |

### ホラー要素を含むデータ

#### 1. post-006: スタッフに関する緊急通知

- **status**: `draft` (下書き、非公開)
- **内容**: スタッフの一部と連絡が取れないという内部文書
- **meta**: `anomalyLevel: 'noticeable'`

#### 2. work-006: 封印されたプロジェクト

- **status**: `sealed` (封印済み)
- **内容**: 冬のイルミネーションプロジェクト（詳細は伏字）
- **特徴**: `images` が空、クライアント名と会場が伏字

#### 3. staff-007: 行方不明のスタッフ

- **state**: `missing` (行方不明)
- **name**: 小林 正人
- **removedReason**: "2024年2月より連絡が取れない状況が続いています。"
- **visibility**: `private` (非公開)

#### 4. inbox-005: 観察者からの警告

- **category**: `sign` (異常な兆候)
- **sender**: 観察者
- **email**: `observer@void.local`
- **内容**: 小林さんの存在に関する不穏なメッセージ
- **timestamp**: `03:33:33` (意図的な不気味なタイムスタンプ)

## 使用方法

### 公開サイトでの使用

```typescript
import { getPublishedPosts, getActiveStaff, getPublicWorks } from "@/lib/data";

// ホラー要素は自動的に除外される
const posts = await getPublishedPosts();
const staff = await getActiveStaff();
const works = await getPublicWorks();
```

### 管理画面での使用

```typescript
import { getAllPosts, getAllStaff, getAllWorks } from "@/lib/data";

// 全てのデータ（ホラー要素含む）を取得
const allPosts = await getAllPosts();
const allStaff = await getAllStaff();
const allWorks = await getAllWorks();
```

### ホラー状態の管理

```typescript
import {
  initHorrorState,
  exposeAnomaly,
  filterSealedStaff,
} from "@/lib/horror";
import { getAllStaff } from "@/lib/data";

// 初期化
let horrorState = initHorrorState();

// ユーザーが異常要素を閲覧
horrorState = exposeAnomaly(horrorState, "anomaly-001");

// フィルタリング
const staff = await getAllStaff();
const visibleStaff = filterSealedStaff(staff, horrorState);
```

## データの特徴

### リアリティのある内容

- 実在しそうな企業名、イベント名を使用
- 日本語の自然な表現（お知らせ、ご挨拶など）
- 実際の企業サイトにありそうなコンテンツ

### ホラー要素の控えめな実装

- 各データセットに1-2件のみ
- 一見すると普通のデータに見える
- 徐々に明らかになる設計

### 型安全性

- 全データが TypeScript の型に準拠
- JSON Schema との互換性
- 型ガードでランタイムチェック可能

## 今後の拡張

### データの追加

新しいデータを追加する場合:

1. `/src/data/*.json` にデータを追加
2. 必要に応じて `/src/lib/data/*.ts` に関数を追加
3. 型定義 `/src/types/entities.ts` を確認

### API への移行

将来的に API に移行する場合も、関数のシグネチャは変更不要:

```typescript
// Before (JSON)
export async function getAllPosts(): Promise<Post[]> {
  return postsData as Post[];
}

// After (API)
export async function getAllPosts(): Promise<Post[]> {
  const response = await fetch("/api/posts");
  return response.json();
}
```

### ホラー演出の追加

新しいホラー演出を追加する場合:

1. `/src/lib/horror/state.ts` に状態管理ロジックを追加
2. `/src/lib/horror/filters.ts` にフィルタリングロジックを追加
3. `/src/types/horror.ts` に必要な型を定義

## まとめ

crayte-studio のデータ層は以下の特徴を持ちます:

- **型安全**: TypeScript による厳密な型定義
- **分離**: データとロジックの明確な分離
- **拡張性**: API への移行が容易
- **ホラー統合**: ARG 要素が自然に組み込まれている
- **リアリティ**: 実在する企業サイトのようなデータ

全てのデータとロジックは、プロジェクトの世界観を壊さないように、慎重に設計されています。
