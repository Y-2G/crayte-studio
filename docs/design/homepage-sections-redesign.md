# TOPページ Newsセクション以降 デザイン改善計画

## 概要

CRAYTE STUDIOのTOPページにおいて、Newsセクション以降の構成が単調でユーザー離脱につながる恐れがあるため、デザインを刷新する。

### 現状の問題点

1. **視覚的単調さ**: 全セクションが同一構成（タイトル→説明→グリッド→ボタン）
2. **リズムの欠如**: 背景色の交互切り替えのみで視覚的変化が乏しい
3. **サービスセクションの弱さ**: 絵文字アイコンが専門性を損なう
4. **実績セクションの未完成感**: プレースホルダー表示
5. **CTAセクションの印象の弱さ**: 単純なテキスト+ボタン構成
6. **ストーリーテリングの欠如**: 会社の強みが十分に伝わらない

---

## デザインコンセプト: "Editorial Dynamism"

雑誌のエディトリアルデザインにインスパイアされた、ダイナミックでありながら洗練されたアプローチ。

### デザイン原則

| 原則 | 説明 |
|------|------|
| **非対称レイアウト** | 予測可能なグリッドを避け、視覚的緊張感を生む |
| **スケールのコントラスト** | 大胆な要素と繊細な要素の組み合わせ |
| **タイポグラフィの階層** | 文字自体をデザイン要素として活用 |
| **戦略的な余白** | 密度の高いゾーンと呼吸のあるスペースの対比 |
| **スクロール連動アニメーション** | 控えめだが印象的なモーション |

### カラーパレット

```css
:root {
  /* Primary */
  --redesign-primary: #2E3A8C;        /* Deep Indigo */
  --redesign-primary-light: #4A5BB8;

  /* Accent */
  --redesign-accent: #FF6B4A;         /* Electric Coral */
  --redesign-accent-soft: #FFB4A2;

  /* Neutrals */
  --redesign-bg-white: #FFFFFF;
  --redesign-bg-warm: #FAF9F7;        /* Warm Grey */
  --redesign-bg-dark: #1A1A2E;        /* Dark Section */

  /* Text */
  --redesign-text-dark: #1A1A2E;
  --redesign-text-muted: #6B7280;
  --redesign-text-light: #F5F5F5;
}
```

### タイポグラフィ

- **Display**: Syne (Google Fonts) - 見出し用のジオメトリックサンセリフ
- **Body Japanese**: Noto Sans JP - 本文用の洗練された日本語フォント
- **Mono/Data**: JetBrains Mono - 日付・数字用

---

## セクション別改善計画

### 1. News Section - "Minimal Timeline"

**コンセプト**: 現在のデザインを基本的に維持しつつ、より洗練された表現に

**変更点**:
- ✅ 現行のFeatured Card + Timeline構造を維持
- 🔄 タイムラインのドット装飾を洗練化
- 🔄 Featured Cardにサブタイトル（記事の冒頭抜粋）を追加
- 🔄 背景に微細なグリッドパターンを追加

```
┌─────────────────────────────────────────────────┐
│  News                                           │
│  ─────                                          │
│                                                 │
│  ┌─────────────────────────────────────────┐   │
│  │ 📌 Featured                              │   │
│  │ ゴールデンウィーク休業のお知らせ         │   │
│  │ 2024年4月27日〜5月6日まで休業...        │   │
│  │ 2024.04.15 ・ お知らせ                  │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  ●── 03/01  新オフィス移転のお知らせ          │
│  │                                             │
│  ●── 02/01  コーポレートサイトリニューアル    │
│                                                 │
│              [ 一覧を見る → ]                  │
└─────────────────────────────────────────────────┘
```

**実装優先度**: 低（現状でも機能している）

---

### 2. Services Section - "Showcase Cards"

**コンセプト**: 各サービスを大胆なビジュアルカードで表現

**変更点**:
- ❌ 絵文字アイコンを廃止
- ✅ カスタムSVGアイコン（モノクロ・ジオメトリック）
- ✅ カードを大型化し、ホバー時にインタラクティブな変化
- ✅ 各サービスにキーワードタグを追加
- ✅ スタッガードレイアウト（非対称配置）

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  What We Do                                                  │
│  ═══════════════════════════════════                        │
│  3つのコア領域で、                                           │
│  クライアントのビジネスをサポートします                       │
│                                                              │
│  ┌─────────────────────────────┐                            │
│  │  ┌──────┐                   │    ┌─────────────────────┐ │
│  │  │ ICON │   Web制作          │    │  ┌──────┐          │ │
│  │  └──────┘                   │    │  │ ICON │ Event     │ │
│  │  Corporate / EC / App       │    │  └──────┘           │ │
│  │                             │    │  Planning / Live /  │ │
│  │  コーポレートサイトから     │    │  Hybrid             │ │
│  │  ECまで、目的に最適化...    │    │                     │ │
│  │                             │    │  企画から運営まで...│ │
│  │         [ 詳しく見る → ]    │    │                     │ │
│  └─────────────────────────────┘    └─────────────────────┘ │
│                                                              │
│                    ┌─────────────────────────┐              │
│                    │  ┌──────┐               │              │
│                    │  │ ICON │   映像制作     │              │
│                    │  └──────┘               │              │
│                    │  PR / Documentary / CM  │              │
│                    │                         │              │
│                    │  ブランドストーリーを... │              │
│                    │         [ 詳しく見る → ]│              │
│                    └─────────────────────────┘              │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**CSS実装ポイント**:
```css
.servicesSection {
  background: var(--redesign-bg-warm);
  padding: 120px 0;
}

.servicesGrid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  grid-template-rows: auto auto;
  gap: 24px;
}

.serviceCard:nth-child(1) {
  grid-row: 1 / 3;  /* Web制作を大きく */
}

.serviceCard:nth-child(2) {
  grid-column: 2;
}

.serviceCard:nth-child(3) {
  grid-column: 2;
}
```

**実装優先度**: 高

---

### 3. Works Section - "Immersive Gallery"

**コンセプト**: 実績を印象的なギャラリー形式で表現

**変更点**:
- ✅ フィーチャード作品（大）+ サブ作品（小）のレイアウト
- ✅ 画像プレースホルダーをジェネレーティブパターンに置換
- ✅ ホバー時にオーバーレイ+詳細情報
- ✅ ダークセクション背景で没入感

```
┌──────────────────────────────────────────────────────────────┐
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓ DARK BACKGROUND ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │
│                                                              │
│  Works                                                       │
│  ─────                                                       │
│  私たちの実績をご紹介します                                   │
│                                                              │
│  ┌────────────────────────────────┐  ┌──────────────────┐  │
│  │                                │  │                  │  │
│  │    [Featured Work Image]       │  │ [Work 2 Image]   │  │
│  │                                │  │                  │  │
│  │    ───────────────────         │  │ ECサイト構築     │  │
│  │    企業様 創業30周年           │  │ 2024             │  │
│  │    記念イベント                │  └──────────────────┘  │
│  │                                │                        │
│  │    #イベント #周年 #映像       │  ┌──────────────────┐  │
│  │                                │  │                  │  │
│  └────────────────────────────────┘  │ [Work 3 Image]   │  │
│                                      │                  │  │
│                                      │ Music Festival   │  │
│                                      │ 2024             │  │
│                                      └──────────────────┘  │
│                                                              │
│              [ 全ての実績を見る → ]                         │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**ジェネレーティブパターン（画像がない場合）**:
```css
.workImagePlaceholder {
  background:
    linear-gradient(135deg,
      var(--redesign-primary) 0%,
      var(--redesign-accent) 100%);
  position: relative;
  overflow: hidden;
}

.workImagePlaceholder::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle at 20% 80%,
      rgba(255,255,255,0.1) 0%,
      transparent 50%),
    radial-gradient(circle at 80% 20%,
      rgba(255,255,255,0.15) 0%,
      transparent 40%);
}
```

**実装優先度**: 高

---

### 4. 新セクション: Numbers / Stats

**コンセプト**: 信頼感を高める実績数字の追加

**配置**: Works と CTA の間

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│        150+            98%           10年+                  │
│     ─────────      ─────────      ─────────                 │
│     プロジェクト    リピート率      業界経験                 │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**アニメーション**:
- スクロールでビューポートに入ったときにカウントアップ
- `Intersection Observer` + CSS `@property` を使用

**実装優先度**: 中

---

### 5. CTA Section - "Bold Statement"

**コンセプト**: 大胆なタイポグラフィと色彩で印象的な締めくくり

**変更点**:
- ✅ フルブリード（画面幅いっぱい）のグラデーション背景
- ✅ 大きな見出しタイポグラフィ
- ✅ ボタンを目立たせるホバーエフェクト
- ✅ 装飾的なグラフィック要素

```
┌──────────────────────────────────────────────────────────────┐
│  ████████████████████████████████████████████████████████████│
│  ██                                                        ██│
│  ██        Let's Create                                    ██│
│  ██        Something                                       ██│
│  ██        Amazing Together                                ██│
│  ██                                                        ██│
│  ██    プロジェクトについてお気軽にご相談ください              ██│
│  ██                                                        ██│
│  ██           ┌───────────────────────┐                    ██│
│  ██           │   お問い合わせ  →     │                    ██│
│  ██           └───────────────────────┘                    ██│
│  ██                                                        ██│
│  ████████████████████████████████████████████████████████████│
└──────────────────────────────────────────────────────────────┘
```

**グラデーション背景**:
```css
.ctaSection {
  background: linear-gradient(
    135deg,
    var(--redesign-primary) 0%,
    #1E2761 50%,
    var(--redesign-bg-dark) 100%
  );
  color: var(--redesign-text-light);
  padding: 160px 24px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

/* 装飾的な円形グラデーション */
.ctaSection::before {
  content: "";
  position: absolute;
  width: 600px;
  height: 600px;
  background: radial-gradient(
    circle,
    var(--redesign-accent) 0%,
    transparent 70%
  );
  opacity: 0.15;
  top: -200px;
  right: -100px;
}
```

**実装優先度**: 高

---

## 実装タスク分解

### Phase 1: 基盤整備

| ID | タスク | 規模 | 状態 |
|----|--------|------|------|
| T1-1 | デザイントークン（CSS変数）の追加 | S | [ ] |
| T1-2 | Google Fonts (Syne) の設定 | S | [ ] |
| T1-3 | SVGアイコンコンポーネント作成 | M | [ ] |

### Phase 2: セクション実装

| ID | タスク | 規模 | 依存 | 状態 |
|----|--------|------|------|------|
| T2-1 | Services Section リニューアル | L | T1-1, T1-3 | [ ] |
| T2-2 | Works Section リニューアル | L | T1-1 | [ ] |
| T2-3 | CTA Section リニューアル | M | T1-1 | [ ] |
| T2-4 | Stats Section 新規作成 | M | T1-1 | [ ] |

### Phase 3: アニメーション・仕上げ

| ID | タスク | 規模 | 依存 | 状態 |
|----|--------|------|------|------|
| T3-1 | スクロールアニメーション実装 | M | T2-* | [ ] |
| T3-2 | ホバーエフェクト追加 | S | T2-* | [ ] |
| T3-3 | レスポンシブ調整 | M | T2-* | [ ] |
| T3-4 | アクセシビリティ確認 | S | T3-* | [ ] |

---

## 技術仕様

### 使用技術

- **Framework**: Next.js App Router (既存)
- **Styling**: CSS Modules (既存パターンを踏襲)
- **Animation**: CSS Transitions + Intersection Observer API
- **Icons**: カスタムSVG (Reactコンポーネント化)

### ファイル構成（新規・変更）

```
src/
├── app/(public)/
│   ├── page.tsx                    # 変更
│   └── page.module.css             # 大幅変更
├── components/
│   ├── public/
│   │   ├── ServiceShowcase/        # 新規
│   │   │   ├── ServiceShowcase.tsx
│   │   │   └── ServiceShowcase.module.css
│   │   ├── WorksGallery/           # 新規
│   │   │   ├── WorksGallery.tsx
│   │   │   └── WorksGallery.module.css
│   │   ├── StatsCounter/           # 新規
│   │   │   ├── StatsCounter.tsx
│   │   │   └── StatsCounter.module.css
│   │   └── CtaBlock/               # 新規
│   │       ├── CtaBlock.tsx
│   │       └── CtaBlock.module.css
│   └── icons/                       # 新規
│       ├── WebIcon.tsx
│       ├── EventIcon.tsx
│       └── VideoIcon.tsx
└── styles/
    └── design-tokens.css            # 変更（新トークン追加）
```

---

## アクセシビリティ考慮事項

- [ ] カラーコントラスト比 4.5:1 以上を確保
- [ ] `prefers-reduced-motion` でアニメーション無効化対応
- [ ] フォーカス状態の明確な視覚化
- [ ] 装飾的な要素には `aria-hidden="true"`
- [ ] セクション見出しの適切な階層構造

---

## レスポンシブブレークポイント

| ブレークポイント | 対応 |
|------------------|------|
| ~767px | モバイル（1カラム、縦積み） |
| 768px~1023px | タブレット（2カラム） |
| 1024px~ | デスクトップ（フルレイアウト） |

---

## 参考デザイン

- Vercel.com - クリーンでありながらダイナミック
- Stripe.com - 洗練されたグラデーション使用
- Linear.app - エディトリアル的なレイアウト

---

## 次のステップ

1. このデザイン計画のレビュー・承認
2. `/execute-plan docs/design/homepage-sections-redesign.md` で実装開始
3. 各Phase完了時にブラウザで確認・フィードバック

---

*作成日: 2026-01-26*
*担当: frontend-design skill*
