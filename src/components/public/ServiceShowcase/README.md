# ServiceShowcase Component

サービスセクション用の非対称グリッドレイアウトコンポーネント。

## 特徴

- **非対称グリッド**: デスクトップでは左側に大きなカード（Web制作）、右側に2つの小さなカード（Event・Video）
- **レスポンシブ**: モバイルでは全て等サイズのカードを縦に並べる
- **アクセシビリティ**: キーボードナビゲーション、適切なARIA属性
- **ホバーエフェクト**: ボーダー色変更、リフトアニメーション、矢印表示

## 使用方法

```tsx
import { ServiceShowcase } from "@/components/public/ServiceShowcase";

const services = [
  {
    title: "Web制作",
    titleEn: "Web Development",
    description: "コーポレートサイト、ECサイト、Webアプリケーションなど、目的に合わせた最適なWeb制作を提供します。",
    tags: ["Corporate", "EC", "Web App"],
    icon: "web" as const,
    link: "/services#web",
  },
  {
    title: "イベント企画・運営",
    titleEn: "Event Planning",
    description: "企画から当日運営まで一貫してサポート。記憶に残る体験を創出します。",
    tags: ["Planning", "Production", "On-site"],
    icon: "event" as const,
    link: "/services#event",
  },
  {
    title: "映像制作",
    titleEn: "Video Production",
    description: "ブランドストーリーを映像で表現。企業PR、ドキュメンタリー、CM制作など幅広く対応。",
    tags: ["Corporate Video", "Documentary", "CM"],
    icon: "video" as const,
    link: "/services#video",
  },
];

export default function Page() {
  return <ServiceShowcase services={services} />;
}
```

## ホームページへの統合例

既存のサービスセクション（90行目〜128行目）を置き換える:

```tsx
import { ServiceShowcase } from "@/components/public/ServiceShowcase";

export default async function HomePage() {
  const services = [
    {
      title: "Web制作",
      titleEn: "Web Development",
      description: "コーポレートサイト、ECサイト、Webアプリケーションなど、目的に合わせた最適なWeb制作を提供します。",
      tags: ["Corporate", "EC", "Web App"],
      icon: "web" as const,
      link: "/services#web",
    },
    {
      title: "イベント企画・運営",
      titleEn: "Event Planning",
      description: "企画から当日運営まで一貫してサポート。記憶に残る体験を創出します。",
      tags: ["Planning", "Production", "On-site"],
      icon: "event" as const,
      link: "/services#event",
    },
    {
      title: "映像制作",
      titleEn: "Video Production",
      description: "ブランドストーリーを映像で表現。企業PR、ドキュメンタリー、CM制作など幅広く対応。",
      tags: ["Corporate Video", "Documentary", "CM"],
      icon: "video" as const,
      link: "/services#video",
    },
  ];

  return (
    <div className={styles.page}>
      {/* ... Hero, News sections ... */}

      {/* Services Section - 新しいコンポーネント使用 */}
      <ServiceShowcase services={services} />

      {/* ... Works, CTA sections ... */}
    </div>
  );
}
```

## Props

### ServiceShowcaseProps

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `services` | `Service[]` | Yes | サービス情報の配列（最大3つ推奨） |
| `className` | `string` | No | 追加のCSSクラス |

### Service

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `title` | `string` | Yes | サービスのタイトル（日本語） |
| `titleEn` | `string` | Yes | サービスのタイトル（英語） |
| `description` | `string` | Yes | サービスの説明 |
| `tags` | `string[]` | Yes | サービスのカテゴリタグ |
| `icon` | `"web" \| "event" \| "video"` | Yes | アイコンタイプ |
| `link` | `string` | Yes | リンク先URL |

## デザイン仕様

### レイアウト

**デスクトップ（768px以上）**:
```
┌─────────────────────────────────┐
│  What We Do                     │
│  ═══════════════════            │
│                                 │
│  ┌─────────────┐ ┌───────────┐ │
│  │             │ │  Event    │ │
│  │   Web制作    │ │           │ │
│  │   (大カード) │ └───────────┘ │
│  │             │ ┌───────────┐ │
│  │             │ │  映像制作  │ │
│  └─────────────┘ └───────────┘ │
└─────────────────────────────────┘
```

**モバイル（768px未満）**:
- 1カラム
- 全カード同サイズ

### カラー

- 背景: `var(--redesign-bg-warm)` (#FAF9F7)
- カード背景: `var(--redesign-bg-white)` (#FFFFFF)
- ボーダー: `var(--public-border)` (#E2E8F0)
- ホバー時ボーダー: `var(--redesign-primary)` (#2E3A8C)
- アイコン: `var(--redesign-primary)`
- ホバー時アイコン: `var(--redesign-accent)` (#FF6B4A)

### タイポグラフィ

- セクション見出し: `var(--font-display)`, 30px-36px (Syne)
- カードタイトル: `var(--font-display)`, 24px-30px
- 英語タイトル: 14px-16px, uppercase, letter-spacing 0.05em
- 説明文: 16px-18px

## アクセシビリティ

- セマンティックHTML（`<section>`, `<header>`, `<h2>`, `<h3>`）
- 適切な見出し階層
- リンクに `aria-label` でコンテキスト提供
- アイコンに `aria-hidden="true"`
- キーボードナビゲーション対応
- フォーカス表示

## ブラウザ対応

- モダンブラウザ（Chrome, Firefox, Safari, Edge の最新2バージョン）
- CSS Grid をサポートするブラウザ
