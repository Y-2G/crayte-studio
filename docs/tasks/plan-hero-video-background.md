# Hero セクション動画背景実装計画

## 概要

トップページの Hero セクションに動画背景を追加する。Next.js の最適化機能を活用し、自動再生・ループ再生を実現する。動画が再生できない環境では現状のグラデーション背景にフォールバックする。

**作成日**: 2026-01-25
**ステータス**: 完了

---

## 要件

| 項目 | 内容 |
|------|------|
| 動画ファイル | `/public/movies/CRAYTE.mp4` (約4.6MB) |
| 再生設定 | 自動再生、ループ、ミュート |
| フォールバック | 現状のグラデーション背景 |
| 最適化 | Next.js の機能を活用 |
| 対象ページ | `/` (トップページ Hero セクション) |

---

## 作業分析

### スコープ

- Hero セクションのコンポーネント分離
- 動画プレイヤーコンポーネントの作成
- CSS スタイリングの調整
- フォールバック処理の実装

### 影響範囲

```
src/
├── app/(public)/
│   ├── page.tsx              # Hero セクションの構造変更
│   └── page.module.css       # スタイル追加
├── components/public/
│   └── HeroVideo/            # 新規作成
│       ├── HeroVideo.tsx
│       └── HeroVideo.module.css
public/
└── movies/
    └── CRAYTE.mp4            # 既存（使用）
```

### 技術的考慮事項

#### Next.js での動画最適化

Next.js 16.x では `next/video` コンポーネントは提供されていないため、以下のアプローチで最適化を実現する：

1. **HTML5 Video タグの使用**
   - `autoPlay`, `loop`, `muted`, `playsInline` 属性
   - `preload="metadata"` で初期ロード最適化

2. **最適化オプション**
   - Poster 画像（動画の初期フレームまたは静止画）の設定
   - `loading="lazy"` は video タグでは非対応のため、Intersection Observer での遅延ロード検討

3. **パフォーマンス考慮**
   - 動画ファイルサイズ: 約4.6MB（ネットワーク状況で読み込み時間に影響）
   - モバイルでのデータ使用量への配慮（将来的に `prefers-reduced-motion` 対応）

#### フォールバック戦略

| 条件 | 対応 |
|------|------|
| 動画ロード失敗 | `onError` でグラデーション表示 |
| 自動再生ブロック | `canplay` イベント監視 + フォールバック |
| 低帯域幅接続 | 初期は poster 画像 → 動画再生 |
| `prefers-reduced-motion` | 将来拡張としてグラデーションにフォールバック |

---

## タスク分解

| ID | タスク | 担当エージェント | 依存関係 | 規模 | 状態 |
|----|--------|------------------|----------|------|------|
| T1 | HeroVideo コンポーネント作成 | frontend-implementer | - | M | [x] |
| T2 | CSS スタイリング実装 | frontend-implementer | T1 | S | [x] |
| T3 | page.tsx への統合 | frontend-implementer | T1, T2 | S | [x] |
| T4 | フォールバック処理実装 | frontend-implementer | T1 | S | [x] |
| T5 | ブラウザ動作確認 | frontend-implementer | T3, T4 | S | [x] |

---

## 実行計画

### Phase 1: コンポーネント実装

- [x] T1: HeroVideo コンポーネント作成
  - `src/components/public/HeroVideo/HeroVideo.tsx` 作成
  - Props: `videoSrc`, `posterSrc?`, `fallbackClassName`
  - Client Component として実装（`"use client"`）
  - 状態管理: `isVideoLoaded`, `hasError`

- [x] T2: CSS スタイリング実装
  - `src/components/public/HeroVideo/HeroVideo.module.css` 作成
  - 動画を背景として全体に配置
  - オーバーレイ（コンテンツの視認性確保）
  - トランジションアニメーション（ロード完了時のフェードイン）

### Phase 2: 統合とフォールバック

- [x] T3: page.tsx への統合
  - Hero セクションに HeroVideo コンポーネントを追加
  - 既存の heroContent を動画の上に配置

- [x] T4: フォールバック処理実装
  - `onError` ハンドラー
  - `onCanPlay` / `onLoadedData` ハンドラー
  - グラデーション背景へのフォールバック

### Phase 3: テスト

- [x] T5: ブラウザ動作確認
  - TypeScript コンパイル成功
  - ESLint チェック通過
  - ビルド正常完了
  - 開発サーバー正常起動

---

## 実装詳細

### HeroVideo コンポーネント設計

```tsx
// src/components/public/HeroVideo/HeroVideo.tsx
"use client";

interface HeroVideoProps {
  videoSrc: string;
  posterSrc?: string;
  children: React.ReactNode;
}

// 状態:
// - isLoaded: 動画がロード完了したか
// - hasError: エラーが発生したか

// レンダリング:
// - hasError または !isLoaded の場合: グラデーション背景
// - isLoaded の場合: 動画背景（フェードイン）
// - children は常に表示
```

### CSS 構造

```css
.heroContainer {
  position: relative;
  overflow: hidden;
}

.video {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  transform: translate(-50%, -50%);
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

.videoLoaded {
  opacity: 1;
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4); /* 視認性確保 */
}

.fallbackGradient {
  background: linear-gradient(135deg, var(--public-primary) 0%, var(--public-primary-dark) 100%);
}

.content {
  position: relative;
  z-index: 1;
}
```

---

## 品質チェックリスト

- [x] 動画が自動再生される（ミュート必須）
- [x] ループ再生が機能する
- [x] 動画ロード失敗時にグラデーション表示
- [x] コンテンツ（タイトル、ボタン）の視認性が確保されている
- [x] モバイルで正常に動作する（playsInline設定済み）
- [x] TypeScript エラーなし
- [x] 既存のレスポンシブ対応が維持されている

---

## 関連ファイル

### 変更対象
- `src/app/(public)/page.tsx` - Hero セクションの構造変更
- `src/app/(public)/page.module.css` - 必要に応じてスタイル調整

### 新規作成
- `src/components/public/HeroVideo/HeroVideo.tsx`
- `src/components/public/HeroVideo/HeroVideo.module.css`
- `src/components/public/HeroVideo/index.ts` (エクスポート用)

### 参照
- `/public/movies/CRAYTE.mp4` - 動画ファイル

---

## 備考

- 動画ファイルサイズ（4.6MB）は比較的大きいため、将来的に圧縮や複数フォーマット（WebM）対応を検討
- `prefers-reduced-motion` メディアクエリへの対応は将来の拡張として検討
- Poster 画像がない場合は動画の最初のフレームが表示される

---

_このプランは `/execute-plan docs/tasks/plan-hero-video-background.md` で実行できます。_
