# Horror System

obserq-studio プロジェクトのホラー/異常状態管理システムです。

## 概要

このディレクトリには、ARG (代替現実ゲーム) のホラー要素を管理するための関数が含まれています。
ユーザーの閲覧行動に応じて異常レベルが上昇し、徐々に不穏な要素が表示されるようになります。

## コンセプト

obserq のホラー演出は「気づかれないうちに世界が変わっている」という"uncanny"な恐怖を目指しています。

### 異常レベルの進行

1. **none** (正常): 普通の企業サイト
2. **subtle** (微細): わずかな違和感（誤字、日付のズレ）
3. **noticeable** (顕著): 明らかな異常（スタッフの失踪、封印されたプロジェクト）
4. **severe** (深刻): 重大な異常（書き換えられた履歴、謎のメッセージ）

## ファイル構成

```
src/lib/horror/
├── index.ts          # 全ての関数をエクスポート
├── state.ts          # 状態管理関数
└── filters.ts        # コンテンツフィルタリング関数
```

## 使用方法

### 状態の初期化

```typescript
import { initHorrorState } from '@/lib/horror';

// 新しいセッションの開始時
const horrorState = initHorrorState();
// {
//   currentLevel: 'none',
//   exposedAnomalies: [],
//   sealedContentIds: [],
//   rewrittenContentIds: []
// }
```

### 異常の公開

```typescript
import { exposeAnomaly, getAnomalyLevel } from '@/lib/horror';

// ユーザーが異常要素を閲覧したとき
let state = initHorrorState();

state = exposeAnomaly(state, 'anomaly-001');
state = exposeAnomaly(state, 'anomaly-002');

// 異常レベルが自動的に更新される
console.log(state.currentLevel); // 'subtle'
```

### コンテンツのフィルタリング

```typescript
import { filterSealedPosts, filterSealedWorks, filterSealedStaff } from '@/lib/horror';
import { getAllPosts, getAllWorks, getAllStaff } from '@/lib/data';

const horrorState = getCurrentHorrorState(); // アプリから取得

// 封印されたコンテンツを除外
const posts = await getAllPosts();
const visiblePosts = filterSealedPosts(posts, horrorState);

const works = await getAllWorks();
const visibleWorks = filterSealedWorks(works, horrorState);

const staff = await getAllStaff();
const visibleStaff = filterSealedStaff(staff, horrorState);
```

### 表示判定

```typescript
import { shouldShowHorrorElement } from '@/lib/horror';

const horrorState = getCurrentHorrorState();

// 異常レベルが 'noticeable' 以上の場合のみ表示
if (shouldShowHorrorElement('noticeable', horrorState.currentLevel)) {
  // 不穏な要素を表示
  return <GlitchEffect />;
}
```

### 進行状況の取得

```typescript
import { getHorrorProgression, getAnomalyLevelDescription } from '@/lib/horror';

const state = getCurrentHorrorState();

// 進行度（パーセンテージ）
const progress = getHorrorProgression(state); // 0-100

// レベルの説明
const description = getAnomalyLevelDescription(state.currentLevel);
console.log(description); // '明確な異常が確認されています。'
```

## 状態管理

### クライアントサイド

ホラー状態は通常、クライアントサイドで管理されます。

```typescript
'use client';

import { useState, useEffect } from 'react';
import { initHorrorState } from '@/lib/horror';
import type { HorrorState } from '@/types';

// カスタムフック例
export function useHorrorState() {
  const [state, setState] = useState<HorrorState>(initHorrorState);

  useEffect(() => {
    // localStorage から復元
    const saved = localStorage.getItem('horrorState');
    if (saved) {
      setState(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    // localStorage に保存
    localStorage.setItem('horrorState', JSON.stringify(state));
  }, [state]);

  return [state, setState] as const;
}
```

## 異常レベルの進行

異常レベルは、公開された異常の数に基づいて自動的に計算されます。

| 公開された異常の数 | 異常レベル |
|------------------|----------|
| 0-1              | none     |
| 2-4              | subtle   |
| 5-7              | noticeable |
| 8+               | severe   |

## 型定義

全てのホラー関連の型は `/src/types/horror.ts` で定義されています。

```typescript
import type {
  HorrorState,
  AnomalyLevel,
  SealedContent,
  AnomalyEvent
} from '@/types';
```

## 実装のヒント

### データとの連携

データ層のホラー要素:

- **Posts**: `status: 'draft'` でホラー要素を含む記事
- **Works**: `status: 'sealed'` で封印されたプロジェクト
- **Staff**: `state: 'missing'` で行方不明のスタッフ
- **Inbox**: `category: 'sign'` で異常な兆候を含むメッセージ

### 段階的な演出

1. **subtle**: 誤字、日付のズレ、微細な UI の乱れ
2. **noticeable**: スタッフページから特定の人物が消える、プロジェクトが「封印済み」になる
3. **severe**: 受信箱に謎のメッセージ、過去の記事が書き換えられる

### ユーザー体験の配慮

- 異常の進行は自然に、気づかれないように
- 強制的な演出は避け、ユーザーが「発見」できるように
- 必ず正常な状態に戻れるようにする（ページリロードなど）
