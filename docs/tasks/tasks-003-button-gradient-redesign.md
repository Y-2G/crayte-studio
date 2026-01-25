# TOPページ ボタン統一 & 背景グラデーション対応

## 概要

TOPページの全ボタンを「全ての実績を見る→」ボタンのデザインに統一し、背景にlogo-brand.pngのグラデーションを適用する。

### 目的
- ボタンデザインの一貫性向上
- ブランドカラー（ロゴのグラデーション）の活用
- ユーザー体験の向上

## 作業分析

### スコープ
- ボタンコンポーネントの新規バリアント追加または既存修正
- TOPページ（page.tsx）のボタン置換
- CSS変数への新しいグラデーションカラー追加
- 背景グラデーションの適用

### 影響範囲
- `src/components/shared/Button/Button.tsx`
- `src/components/shared/Button/Button.module.css`
- `src/app/(public)/page.tsx`
- `src/app/(public)/page.module.css`
- `src/styles/variables.css`
- 各コンポーネント（CtaBlock, NewsTimeline等）

### 参照デザイン

**「全ての実績を見る→」ボタン（WorksGallery）:**
```css
.viewAllLink {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--redesign-text-light);
  text-decoration: none;
  padding: var(--spacing-4) var(--spacing-6);
  border: 2px solid var(--redesign-accent);
  border-radius: var(--border-radius-full);
  transition: background-color var(--transition-normal),
    transform var(--transition-normal);
}

.viewAllLink:hover {
  background-color: var(--redesign-accent);
  transform: translateY(-2px);
}
```

**logo-brand.pngのグラデーションカラー:**
- マゼンタ/ピンク: #FF1493 ～ #FF69B4
- シアン/水色: #00BFFF ～ #00CED1
- 紫/バイオレット: #9370DB ～ #8A2BE2
- オレンジ（アクセント）: #FFA500

推奨グラデーション:
```css
--gradient-brand: linear-gradient(135deg, #FF1493 0%, #9370DB 50%, #00BFFF 100%);
```

## タスク分解

| ID | タスク | 担当エージェント | 依存関係 | 規模 | 状態 |
|----|--------|------------------|----------|------|------|
| T1 | CSS変数にグラデーションカラーを追加 | frontend-implementer | - | S | [x] |
| T2 | Buttonコンポーネントに「outline」バリアント追加 | frontend-implementer | T1 | M | [x] |
| T3 | TOPページのHeroセクションボタン更新 | frontend-implementer | T2 | S | [x] |
| T4 | Newsセクションボタン更新 | frontend-implementer | T2 | S | [x] |
| T5 | CtaBlockコンポーネントのボタン更新 | frontend-implementer | T2 | S | [x] |
| T6 | 背景グラデーションの適用 | frontend-implementer | T1 | M | [x] |
| T7 | レスポンシブ・アクセシビリティ確認 | frontend-implementer | T3,T4,T5,T6 | S | [ ] |

## 実行計画

### Phase 1: 基盤整備（並列実行可能）
- [x] T1: CSS変数にグラデーションカラーを追加
  - `src/styles/variables.css`に以下を追加:
    ```css
    --gradient-brand: linear-gradient(135deg, #FF1493 0%, #9370DB 50%, #00BFFF 100%);
    --gradient-brand-reverse: linear-gradient(135deg, #00BFFF 0%, #9370DB 50%, #FF1493 100%);
    --color-brand-pink: #FF1493;
    --color-brand-cyan: #00BFFF;
    --color-brand-purple: #9370DB;
    ```

### Phase 2: コンポーネント実装
- [x] T2: Buttonコンポーネントに「outline」バリアント追加
  - 新しいvariant: `outline`
  - スタイル: ボーダー2px、border-radius-full、透明背景、ホバーで背景色変化
  - 矢印アイコンのサポート（children内で対応）

### Phase 3: ページ更新（並列実行可能）
- [x] T3: Heroセクションボタン更新
  - 「お問い合わせ →」「実績を見る →」を新デザイン(outline)に
- [x] T4: Newsセクションボタン更新
  - 「一覧を見る →」を新デザイン(outlineLight)に変更
- [x] T5: CtaBlockコンポーネントボタン更新
  - 既存Buttonを新デザイン(outline)に合わせる

### Phase 4: 背景対応
- [x] T6: 背景グラデーションの適用
  - CTAセクションにブランドカラーのグラデーション背景を適用
  - 装飾的な円形グラデーションにピンク(--color-brand-pink)とシアン(--color-brand-cyan)を使用

### Phase 5: 品質確認
- [ ] T7: レスポンシブ・アクセシビリティ確認
  - モバイル/タブレット/デスクトップでの表示確認
  - キーボードナビゲーション確認
  - コントラスト比の確認

## 品質チェックリスト

- [ ] 全ボタンのデザイン統一確認
- [ ] ホバー・フォーカス状態の動作確認
- [ ] レスポンシブ対応（モバイル～デスクトップ）
- [ ] アクセシビリティ（コントラスト比、フォーカス表示）
- [ ] reduced-motion対応
- [ ] 既存機能への影響なし

## 関連ファイル

### 変更対象
- `src/styles/variables.css` - グラデーション変数追加
- `src/components/shared/Button/Button.tsx` - outlineバリアント追加
- `src/components/shared/Button/Button.module.css` - outlineスタイル追加
- `src/app/(public)/page.tsx` - ボタン更新
- `src/app/(public)/page.module.css` - 背景グラデーション
- `src/components/public/CtaBlock/CtaBlock.tsx` - ボタン更新

### 参照
- `src/components/public/WorksGallery/WorksGallery.module.css` - デザイン参照
- `public/images/logo-brand.png` - グラデーションカラー参照

## 備考

### デザイン方針
1. 「全ての実績を見る→」ボタンの特徴:
   - 透明背景 + アクセントカラーのボーダー
   - 完全な丸角（border-radius-full）
   - ホバー時に背景色がfillされる
   - 矢印(→)が右に移動するアニメーション

2. グラデーション背景の適用候補:
   - ページ全体の背景（微細なグラデーション）
   - CTAセクションの背景強化
   - ヘッダー/フッターのアクセント

### 考慮事項
- 暗い背景（WorksGallery等）と明るい背景で見やすさを確保
- グラデーションは控えめに使用し、派手すぎないように
