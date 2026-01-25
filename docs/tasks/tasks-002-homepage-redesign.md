# TOPページ Newsセクション以降 デザイン改善

## 概要

**目的**: TOPページのNewsセクション以降（Services、Works、CTA）のデザインを改善し、ユーザー離脱を防ぎ、コンバージョンを向上させる。

**背景**: 現在のデザインは全セクションが同一構成で単調であり、視覚的なリズムが欠如している。これがユーザー離脱の原因となる恐れがある。

**設計ドキュメント**: `docs/design/homepage-sections-redesign.md`

---

## 作業分析

### スコープ
- News Section: 軽微な改善（現状維持ベース）
- Services Section: 大幅リニューアル
- Works Section: 大幅リニューアル
- Stats Section: 新規追加
- CTA Section: 大幅リニューアル

### 影響範囲
- `src/app/(public)/page.tsx` - メインページ
- `src/app/(public)/page.module.css` - スタイル
- 新規コンポーネント4種

### リスク
- 既存のレスポンシブ対応との整合性
- パフォーマンス（アニメーション追加による）
- ブランドイメージとの整合性

---

## タスク分解

| ID | タスク | 担当エージェント | 依存関係 | 規模 | 状態 |
|----|--------|------------------|----------|------|------|
| T1-1 | デザイントークン（CSS変数）追加 | frontend-implementer | - | S | [x] |
| T1-2 | Google Fonts (Syne) 設定 | frontend-implementer | - | S | [x] |
| T1-3 | SVGアイコンコンポーネント作成 (Web/Event/Video) | frontend-implementer | - | M | [x] |
| T2-1 | ServiceShowcase コンポーネント実装 | frontend-implementer | T1-1, T1-3 | L | [x] |
| T2-2 | WorksGallery コンポーネント実装 | frontend-implementer | T1-1 | L | [x] |
| T2-3 | CtaBlock コンポーネント実装 | frontend-implementer | T1-1 | M | [x] |
| T2-4 | StatsCounter コンポーネント実装 | frontend-implementer | T1-1 | M | [x] |
| T3-1 | page.tsx 統合・リファクタリング | frontend-implementer | T2-* | M | [x] |
| T3-2 | スクロールアニメーション実装 | frontend-implementer | T3-1 | M | [x] |
| T3-3 | レスポンシブ調整・検証 | frontend-implementer | T3-1 | M | [x] |
| T3-4 | アクセシビリティ確認・修正 | frontend-implementer | T3-3 | S | [x] |

---

## 実行計画

### Phase 1: 基盤整備 (並列実行可能)

- [x] T1-1: デザイントークン追加
  - `src/styles/variables.css` に新しいカラー変数追加
  - Primary: `#2E3A8C`, Accent: `#FF6B4A`

- [x] T1-2: フォント設定
  - Google Fonts から Syne を追加
  - `next/font` で最適化

- [x] T1-3: アイコンコンポーネント
  - `src/components/icons/` 配下に3種作成
  - WebIcon, EventIcon, VideoIcon

### Phase 2: コンポーネント実装 (T1完了後、並列実行可能)

- [x] T2-1: ServiceShowcase
  - 非対称グリッドレイアウト
  - カスタムSVGアイコン使用
  - ホバーエフェクト

- [x] T2-2: WorksGallery
  - Featured + サブ作品のレイアウト
  - ダーク背景
  - ジェネレーティブパターンプレースホルダー

- [x] T2-3: CtaBlock
  - グラデーション背景
  - 大胆なタイポグラフィ
  - 装飾的グラフィック要素

- [x] T2-4: StatsCounter
  - カウントアップアニメーション
  - Intersection Observer 使用

### Phase 3: 統合・仕上げ (T2完了後)

- [x] T3-1: ページ統合
  - 各コンポーネントをpage.tsxに組み込み
  - 不要なコード削除

- [x] T3-2: アニメーション
  - スクロール連動フェードイン
  - `prefers-reduced-motion` 対応

- [x] T3-3: レスポンシブ
  - モバイル (〜767px)
  - タブレット (768〜1023px)
  - デスクトップ (1024px〜)

- [x] T3-4: アクセシビリティ
  - コントラスト比確認
  - フォーカス状態確認
  - ARIA属性確認

---

## 品質チェックリスト

- [x] デザイン仕様書との整合性確認
- [x] 既存ブランドカラーとの調和
- [ ] Lighthouse スコア確認（Performance 90+）
- [x] 全ブレークポイントでの表示確認
- [ ] Safari/Chrome/Firefox での動作確認
- [x] `prefers-reduced-motion` でのアニメーション無効化確認
- [x] カラーコントラスト比 4.5:1 以上（WCAG AAA達成）

---

## 関連ファイル

### 変更対象
- `src/app/(public)/page.tsx`
- `src/app/(public)/page.module.css`
- `src/styles/design-tokens.css`

### 新規作成
- `src/components/public/ServiceShowcase/ServiceShowcase.tsx`
- `src/components/public/ServiceShowcase/ServiceShowcase.module.css`
- `src/components/public/WorksGallery/WorksGallery.tsx`
- `src/components/public/WorksGallery/WorksGallery.module.css`
- `src/components/public/StatsCounter/StatsCounter.tsx`
- `src/components/public/StatsCounter/StatsCounter.module.css`
- `src/components/public/CtaBlock/CtaBlock.tsx`
- `src/components/public/CtaBlock/CtaBlock.module.css`
- `src/components/icons/WebIcon.tsx`
- `src/components/icons/EventIcon.tsx`
- `src/components/icons/VideoIcon.tsx`

### 参照ドキュメント
- `docs/design/homepage-sections-redesign.md` - デザイン仕様

---

## 実行コマンド

```bash
/execute-plan docs/tasks/tasks-002-homepage-redesign.md
```

---

*作成日: 2026-01-26*
