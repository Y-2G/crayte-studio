# crayte-studio

ホラー体験ARG: 架空企業コーポレートサイト（表）とWordPress風管理画面（裏）

## 概要

crayte-studioは、表向きは普通のWeb制作会社のコーポレートサイトですが、管理画面にアクセスすると徐々に異常なメタデータや状態が見えてくる二層構造のホラー体験ARG（代替現実ゲーム）です。

### 技術スタック

- **Next.js 16.1.4** (App Router)
- **React 19.2.3** (React Compiler enabled)
- **TypeScript** (strict mode)
- **CSS Modules** + CSS Variables
- **Geist Sans/Mono** フォント

## プロジェクト構成

### 二層構造

| 層                   | URL           | 目的                     | 雰囲気                       |
| -------------------- | ------------- | ------------------------ | ---------------------------- |
| **表（公開サイト）** | `/` 以下      | 普通のコーポレートサイト | クリーン、プロフェッショナル |
| **裏（管理画面）**   | `/admin` 以下 | WordPress風CMS UI        | 不穏、徐々に異常が露呈       |

### ディレクトリ構造

```
src/
├── app/
│   ├── (public)/          # 公開サイト（表）
│   │   ├── page.tsx       # トップ
│   │   ├── company/       # 会社概要
│   │   ├── services/      # サービス
│   │   ├── works/         # 実績
│   │   ├── news/          # ニュース
│   │   ├── staff/         # スタッフ
│   │   └── contact/       # お問い合わせ
│   └── admin/             # 管理画面（裏）
│       ├── page.tsx       # Dashboard
│       ├── posts/         # 投稿管理
│       ├── works/         # 実績管理
│       ├── staff/         # スタッフ管理
│       └── inbox/         # フォーム受信箱
├── components/
│   ├── public/            # 公開サイト用
│   ├── admin/             # 管理画面用
│   └── shared/            # 共通コンポーネント
├── lib/
│   ├── data/              # データ取得・操作
│   ├── horror/            # ホラー要素ロジック
│   └── utils/             # ユーティリティ
├── types/                 # 型定義
├── styles/                # グローバルスタイル・変数
└── data/                  # JSONデータファイル
```

## セットアップ

### 必要要件

- Node.js 18以上
- npm または yarn

### インストール

```bash
# 依存関係のインストール
npm install
# または
yarn install
```

### 開発サーバーの起動

```bash
npm run dev
# または
yarn dev
```

ブラウザで以下のURLにアクセス:

- 公開サイト: http://localhost:3000
- 管理画面: http://localhost:3000/admin

### ビルド

```bash
npm run build
# または
yarn build
```

### 本番環境での起動

```bash
npm start
# または
yarn start
```

## 主要機能

### 公開サイト（表）

- TOPページ（ヒーロー、サービス、実績、ニュース）
- 会社概要（会社情報、ミッション・ビジョン、沿革、アクセス）
- サービス（Web制作、イベント企画、映像制作）
- 実績一覧・詳細
- ニュース一覧・詳細
- スタッフ一覧・詳細
- お問い合わせフォーム

### 管理画面（裏）

- ダッシュボード（統計、最近の投稿、アクティビティ）
- 投稿管理（CRUD、カテゴリ・タグ管理）
- 固定ページ管理
- 実績管理（カスタム投稿タイプ風）
- スタッフ管理
- フォーム受信箱
- WordPress風UI（サイドバー、テーブル、メタボックス）

### ホラー要素

管理画面に段階的に実装された異常要素:

#### レベル1（表層）

- 統計の微妙な不整合（表示件数と実際の件数のズレ）
- 不自然なタイムスタンプ（未来日付の下書き）
- 謎のカテゴリ・タグ（`[REDACTED]`, `archived_v0`）

#### レベル2（中層）

- 削除済みアイテムの痕跡
- 異常なメタデータ（`review_status: "under_observation"`）
- 見えないコメント（件数と表示の不一致）

#### レベル3（深層）

- Sealedコンテンツ（`status: "sealed"`）
- Rewrittenコンテンツ（編集履歴の謎の書き換え）
- 削除理由の異常（`removed_reason: "voluntary_absence"`）

## 設計原則

### ホラー要素のルール

1. **1画面1-2箇所の制約**: 過剰な演出を避け、違和感を自然に演出
2. **深部ほど濃い段階的設計**: 表層は微妙な違和感、深層ほど明確な異常
3. **ラベル置換の自然さ**: 通常の用語に近い異常な用語の使用
4. **気づきの演出**: プレイヤーが自ら発見できる設計

### コード品質

- TypeScript strict modeを使用
- ESLintによるコード品質チェック
- CSS Modulesによるスタイルのスコープ化
- アクセシビリティ対応（ARIA属性、キーボードナビゲーション）
- レスポンシブデザイン（モバイル/タブレット/デスクトップ）

## 開発ガイド

### スタイリング

CSS Variables（`src/styles/variables.css`）で一元管理:

- カラー（表/裏で別テーマ）
- タイポグラフィ
- スペーシング
- ブレークポイント

### 型定義

すべての主要エンティティは`src/types/`で定義:

- `entities.ts`: Post, Work, Staff等
- `horror.ts`: HorrorState, AnomalyLevel等
- `ui.ts`: Navigation, Table, Form等

### データ管理

JSONベースの静的データ（`src/data/`）:

- `posts.json`: ブログ投稿
- `works.json`: 実績
- `staff.json`: スタッフ
- `pages.json`: 固定ページ
- `inbox.json`: フォーム受信

将来的にCMS連携可能な設計。

## ドキュメント

詳細な実装計画は`docs/tasks/tasks-001.md`を参照してください。

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 注意事項

このプロジェクトはホラー体験ARGとして設計されており、一部のコンテンツには不穏な表現が含まれます。
