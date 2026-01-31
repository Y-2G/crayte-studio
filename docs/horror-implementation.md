# ホラー要素実装ガイド

## 概要

crayte-studio プロジェクトの管理画面に実装されたホラー要素のドキュメント。
ARG（代替現実ゲーム）として、表（公開サイト）は普通のコーポレートサイトだが、裏（管理画面）では徐々に異常が見えてくる設計。

## 設計原則

1. **段階的な異常**: 1 画面に 1〜2 箇所まで
2. **深部ほど濃く**: 表層（一覧）→ 中層（詳細）→ 深層（編集）と進むほど強度が上がる
3. **気づく人だけ気づく**: 過剰にせず、注意深い観察者だけが発見できる程度

## 実装されたホラー要素

### レベル 1: 表層（最初に気づく違和感）

#### ダッシュボード（`src/app/admin/page.tsx`）

- **統計の不整合**: 投稿カウントが 7 件だが、実際のデータは 6 件（post-001〜007 のうち 1 件が存在しない扱い）
- **異常な日付**: `post-001` の作成日が `2024-02-30` （存在しない日付）
- ホラー用 CSS（`horror.module.css`）を利用した視覚的な違和感表現

#### 投稿一覧（`src/app/admin/posts/page.tsx` + `PostsTable.tsx`）

- **謎のカテゴリ**: `post-006` のカテゴリが「内部連絡」（ホラーテキストで表示）
- **異常なステータス**: ホラー要素を持つ投稿は「観察中」と表示
- **存在しない日付**: 2024-02-30 のような不可能な日付が赤く表示

### レベル 2: 中層（詳細を見ると気づく異常）

#### 制作実績一覧（`src/app/admin/works/page.tsx` + `WorksTable.tsx`）

- **封印されたプロジェクト**: `work-006` が status: "sealed"
  - タイトル: 「ウィンター・イルミネーションプロジェクト 2023」
  - クライアント名と会場が █ で墨塗り（redacted）
  - ステータスが「封印」（ホラーカラーで表示）

#### スタッフ一覧（`src/app/admin/staff/page.tsx` + `StaffTable.tsx`）

- **行方不明者**: `staff-007` (小林正人) が state: "missing"
  - 状態が「不明」（ホラーカラー）
  - 削除理由: 「2024 年 2 月より連絡が取れない状況が続いています。」

#### フォーム受信箱（`src/app/admin/inbox/page.tsx` + `InboxTable.tsx`）

- **謎のカテゴリ**: `inbox-005` が category: "sign"（兆候）
- **異常な時刻**: 受信時刻が `03:33:33` （不吉な時刻パターン）
- **観察者からのメッセージ**: sender: "観察者", email: "observer@void.local"

### レベル 3: 深層（編集画面で見える内容）

#### 投稿編集（`src/app/admin/posts/[id]/edit/PostEditor.tsx`）

- **威圧的なレビューコメント**: `post-006` に叱責的なコメント
  - 例: 「この内容での公開は控えてください。もう少し詳細を確認してから判断します。」
  - ホラースタイル（赤枠、警告アイコン）で表示
- **観察記録セクション**: ホラーメタデータを持つ投稿に警告ボックスを表示
  - タイトル: "⚠ 観察記録"
  - 内容: `observationNotes` から取得

#### 制作実績編集（`src/app/admin/works/[id]/edit/WorkEditor.tsx`）

- **封印警告**: status が "sealed" の制作実績に警告メッセージ
  - 「このプロジェクトは封印されています。閲覧記録が残ります。」
  - 「編集や公開を行う場合は、管理者の承認が必要です。」

#### スタッフ編集（`src/app/admin/staff/[id]/edit/StaffEditor.tsx`）

- **行方不明者の詳細**: state が "missing" のスタッフに警告ボックス
  - タイトル: "⚠ 状態メモ" → "行方不明者"
  - 削除理由（`removedReason`）を強調表示
  - 例: 「2024 年 2 月より連絡が取れない状況が続いています。」

## 技術実装

### ホラーユーティリティ（`src/lib/horror/utils.ts`）

```typescript
// 主要な関数
- hasHorrorMeta(meta): メタデータにホラー要素があるか判定
- getHorrorMeta(meta): ホラーメタデータを抽出
- isAnomalousDate(dateString): 異常な日付判定（2024-02-30など）
- isAnomalousTime(dateString): 異常な時刻判定（03:33:33など）
- formatDateWithAnomaly(dateString): 日付を整形し、異常フラグを返す
- redactText(text, percentage): テキストを █ で墨塗り
```

### CSS Modules（`src/styles/horror.module.css`）

```css
主要なクラス:
- .anomalySubtle, .anomalyNoticeable, .anomalySevere: 異常レベル別の背景色
- .horrorText, .horrorTextGlow: ホラー用テキスト色（暗赤）
- .anomalousDate: 異常な日付のスタイル（下線アニメーション）
- .sealedBadge, .rewrittenBadge, .missingBadge: 状態バッジ
- .observationNote: 観察メモ用のスタイル
- .warningBox: 警告ボックス
- .horrorReviewComment: ホラー用レビューコメント
```

### CSS 変数（`src/styles/variables.css`）

```css
ホラー用カラー:
- --horror-subtle: rgba(139, 0, 0, 0.05)
- --horror-noticeable: rgba(139, 0, 0, 0.15)
- --horror-severe: rgba(139, 0, 0, 0.3)
- --horror-text: #8b0000 (暗赤)
- --horror-glow: 0 0 10px rgba(139, 0, 0, 0.3)
```

## サンプルデータ

### posts.json

- `post-001`: createdAt が `2024-02-30` （存在しない日付）
- `post-006`: ホラーメタデータ、内部連絡カテゴリ、レビューコメント付き

### works.json

- `work-006`: status: "sealed", クライアント・会場が墨塗り

### staff.json

- `staff-007`: state: "missing", removedReason 付き

### inbox.json

- `inbox-005`: category: "sign", createdAt が `03:33:33`

## 型定義（`src/types/horror.ts`）

```typescript
// 異常レベル
type AnomalyLevel = "none" | "subtle" | "noticeable" | "severe";

// ホラーメタデータ
interface HorrorMeta {
  anomalyLevel?: AnomalyLevel;
  isSealed?: boolean;
  isRewritten?: boolean;
  originalContent?: string;
  observationNotes?: string[];
  lastAnomalyAt?: string;
  anomalyCount?: number;
}
```

## 拡張ポイント

### 新しいホラー要素を追加する場合

1. **データ層**: `src/data/*.json` にホラー用データを追加
2. **メタデータ**: `meta` フィールドに `HorrorMeta` を設定
3. **UI 層**: 該当コンポーネントで `horror/utils` と `horror.module.css` を使用
4. **スタイル**: 必要に応じて `horror.module.css` に新しいクラスを追加

### 推奨パターン

```tsx
import { hasHorrorMeta, getHorrorMeta } from "@/lib/horror/utils";
import horrorStyles from "@/styles/horror.module.css";

// ホラー要素チェック
const isHorror = hasHorrorMeta(item.meta);
const horrorMeta = isHorror ? getHorrorMeta(item.meta) : null;

// 条件付きスタイル適用
<div className={isHorror ? horrorStyles.warningBox : ""}>
  {/* コンテンツ */}
</div>;
```

## 注意事項

1. **公開サイト（表）には一切ホラー要素を入れない**

   - `/admin/*` 以外のパスではホラー要素を表示しない
   - `getPublicWorks()`, `getActiveStaff()` などのフィルタ関数を使用

2. **過剰にしない**

   - 1 画面に 1〜2 箇所まで
   - 派手なアニメーションは避ける
   - 「気づく人だけ気づく」程度

3. **アクセシビリティ**
   - ホラー要素もセマンティック HTML で記述
   - 色だけに頼らず、テキストやアイコンでも情報を伝える

## 今後の拡張案

- ダッシュボードの「最近のアクティビティ」に謎のアクティビティを追加
- メディアライブラリに存在しない画像への参照を追加
- コメント一覧に自動生成された不気味なコメントを追加
- ログイン履歴に不明な IP アドレスからのアクセス記録
