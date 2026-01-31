# TOP ページデザイン改善計画

> Hero 以降のセクション単調さ解消・ユーザー離脱防止のためのリデザイン

**作成日**: 2026-01-25
**ステータス**: 部分適用（News セクションのみ）

---

## 1. 概要

### 1.1 課題

現在の TOP ページ（Hero 以降）は以下の問題を抱えている：

- **背景の単調さ**: 白背景が続き、Hero の勢いが途切れる
- **レイアウトの均一性**: 「見出し → カード 3 枚」の繰り返しで読み物モードに入る
- **インタラクションの不足**: 静的なコンテンツが続き「ただ眺める」状態になる
- **視覚的リズムの欠如**: セクション間の変化が乏しい

### 1.2 適用された改善

**News セクションのみ**改修を適用：

- ピックアップカード（最新 1 件を強調表示）
- タイムライン形式（残りの記事を縦ラインで表示）
- Hero セクションの直後に配置

他のセクション（Services, Works, Numbers）の改修は見送り。

---

## 2. 現在のページ構成

```
Hero (ビデオ背景)
  ↓
News (ピックアップ + タイムライン) ← 改修済み・位置変更
  ↓
Services (元のCard/CardBodyを使用)
  ↓
Works (元のCard/CardBodyを使用)
  ↓
CTA
```

---

## 3. 適用された変更

### 3.1 NewsTimeline コンポーネント

**新規作成ファイル:**

- `src/components/public/NewsTimeline/NewsTimeline.tsx`
- `src/components/public/NewsTimeline/NewsTimeline.module.css`
- `src/components/public/NewsTimeline/index.ts`

**機能:**

1. 最新 1 件をピックアップカードとして強調（📌 最新バッジ付き）
2. 残りをタイムライン形式（左に縦ライン + ドット）で表示
3. ホバー時の視覚的フィードバック
4. レスポンシブ対応

**デザイン:**

```
┌─────────────────────────┐
│ 📌 最新: [タイトル]      │  ← ピックアップカード
│     2026.01.25          │
└─────────────────────────┘

│ 2026
├─ 01.20 [お知らせ] タイトル
├─ 01.15 [制作制作実績] タイトル    ← タイムライン形式
└─ 01.10 [採用]    タイトル
```

### 3.2 TOP ページの変更

**変更ファイル:**

- `src/app/(public)/page.tsx` - NewsTimeline をインポート、News セクションを Hero 直後に移動

---

## 4. 見送られた改善案

以下は当初計画されていたが、適用されなかった改善案：

### 4.1 Services セクション

- 巨大背景タイポグラフィ（WEB / EVENT / FILM）
- 3D ホバーエフェクト
- 成果指標バッジ

### 4.2 Works セクション

- Featured（大型）+ 通常（小型）のレイアウト
- 課題 → 打ち手 → 成果の 3 行サマリー
- 斜めセクション区切り

### 4.3 Numbers セクション

- カウントアップアニメーション
- 制作実績数 / 継続率 / 平均納期

### 4.4 基盤コンポーネント

- useScrollAnimation フック
- SectionDivider コンポーネント
- 追加 CSS 変数（グラデーション、3D 効果）

---

## 5. 関連ファイル

### 5.1 変更対象

- `src/app/(public)/page.tsx` - NewsTimeline 使用、セクション順序変更

### 5.2 新規作成（残存）

- `src/components/public/NewsTimeline/NewsTimeline.tsx`
- `src/components/public/NewsTimeline/NewsTimeline.module.css`
- `src/components/public/NewsTimeline/index.ts`

### 5.3 削除されたファイル

- `src/components/public/ServiceCard/` - 削除
- `src/components/public/FeaturedWork/` - 削除
- `src/components/public/WorkCard/` - 削除
- `src/components/public/NumbersSection/` - 削除
- `src/components/public/SectionDivider/` - 削除
- `src/hooks/useScrollAnimation.ts` - 削除

---

## 6. 今後の検討事項

見送られた改善案を将来的に適用する場合は、このドキュメントの「4. 見送られた改善案」を参照。

---

_最終更新: 2026-01-26_
