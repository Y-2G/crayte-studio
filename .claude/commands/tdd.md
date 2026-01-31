# TDD Cycle Command

RED → GREEN → REFACTOR のTDDサイクルを対話的に実行します。

## Input

テスト対象の説明: $ARGUMENTS

`$ARGUMENTS` が空の場合は、以下をユーザーに質問してください：
- 何をテストしたいか（機能の説明）
- 対象のファイルパスまたはコンポーネント名

`--type unit` または `--type story` が指定されている場合はそのテスト種別を使用。
指定がない場合は対象パスから自動判定してください。

## テスト種別の自動判定

| 対象のパス | テスト種別 | コマンド |
|---|---|---|
| `src/components/**` | Storybook インタラクションテスト (`*.stories.tsx`) | `npx vitest run --project storybook <path>` |
| `src/types/**`, `src/lib/**`, `src/data/**` | Vitest ユニットテスト (`*.test.ts`) | `npx vitest run <path>` |

判定に迷う場合はユーザーに確認してください。

## TDDサイクル

以下の4フェーズを順に実行します。各フェーズの開始時にヘッダーを表示してください。

---

### Phase 1: 🔴 RED — 失敗するテストを作成

1. **対象コードの調査**
   - 対象ファイルが既にあるか確認
   - 既存のテストファイルがあるか確認
   - 関連する型定義やインターフェースを読み込む

2. **テストファイルの作成**
   テスト種別に応じたファイルを作成する。

   **ユニットテスト** (`*.test.ts`):
   - 配置先: 対象ファイルと同階層の `__tests__/` ディレクトリ
   - パターン: `describe`/`it`/`expect` (vitest)
   - テンプレート:
     ```typescript
     import { describe, it, expect } from 'vitest';
     import { targetFunction } from '../targetModule';

     describe('targetFunction', () => {
       it('should [期待される振る舞い]', () => {
         expect(targetFunction(input)).toBe(expected);
       });
     });
     ```

   **Storybook インタラクションテスト** (`*.stories.tsx`):
   - 配置先: 対象コンポーネントと同じディレクトリ
   - パターン: `Meta`/`StoryObj` from `@storybook/nextjs-vite`、`play` 関数
   - テンプレート:
     ```typescript
     import type { Meta, StoryObj } from '@storybook/nextjs-vite';
     import { expect, fn, userEvent, within } from 'storybook/test';
     import { Component } from './Component';

     const meta = {
       title: 'Category/Component',
       component: Component,
       tags: ['autodocs'],
     } satisfies Meta<typeof Component>;

     export default meta;
     type Story = StoryObj<typeof meta>;

     export const Default: Story = {
       args: { /* props */ },
       play: async ({ canvasElement }) => {
         const canvas = within(canvasElement);
         await expect(canvas.getByRole('...')).toBeInTheDocument();
       },
     };
     ```

3. **インポートエラー対策**
   - テスト対象のモジュール/コンポーネントが存在しない場合は、**空のスタブ実装を先に作成**してからテストを作成する
   - スタブ例（関数）: `export function targetFunction() { throw new Error('Not implemented'); }`
   - スタブ例（コンポーネント）: `export function Component() { return null; }`

4. **テスト実行 → 失敗を確認**
   ```bash
   # ユニットテスト
   npx vitest run <テストファイルのパス>

   # Storybook テスト
   npx vitest run --project storybook <テストファイルのパス>
   ```

   - テストが **FAIL** することを確認する
   - もし PASS してしまった場合は、テストが正しく書けていない。アサーションを見直す
   - Playwright未インストールエラーが出た場合: `npx playwright install chromium` を実行

**ユーザーに報告**: 作成したテストの内容と、失敗した結果を表示する。

---

### Phase 2: 🟢 GREEN — テストを通す最小限の実装

1. **最小限のコードを実装**
   - テストを通すために必要な最小限のコードだけを書く
   - 過度な汎用化やエッジケース対応はこの段階では行わない
   - 既存のコードパターン・命名規則に従う（CLAUDE.md参照）

2. **テスト実行 → 成功を確認**
   ```bash
   # 対象テストを実行
   npx vitest run <テストファイルのパス>
   ```
   - テストが **PASS** することを確認

3. **リグレッションチェック**
   既存テストに影響がないか確認：
   ```bash
   # ユニットテスト全体
   npx vitest run --exclude '**/*.stories.*'

   # またはStorybook テスト全体（Storybook対象の場合）
   npx vitest run --project storybook
   ```
   - **リグレッション発見時**: 変更を切り戻し、原因を分析してユーザーに報告する

**ユーザーに報告**: 実装した内容と、テスト成功の結果を表示する。

---

### Phase 3: 🔵 REFACTOR — リファクタリング

1. **改善点の提案**
   以下の観点でコードを分析し、改善点をユーザーに提示する：
   - 可読性の向上（命名、構造）
   - 重複の排除
   - 型安全性の強化
   - プロジェクト規約への準拠（CSS Modules、パス別名 `@/*` 等）

2. **ユーザーの判断を仰ぐ**
   - 提案した改善点について、実施するかどうか確認
   - 「リファクタリング不要」の場合は Phase 4 に進む

3. **1変更ずつリファクタリング**
   - 変更を1つ実施するごとにテスト実行
   ```bash
   npx vitest run <テストファイルのパス>
   ```
   - 全テスト PASS を確認してから次の変更へ

---

### Phase 4: 🏁 サイクル完了

1. **完了レポート**を表示：
   ```
   ────────────────────────────────────
   ✅ TDDサイクル完了
   ────────────────────────────────────
   テスト種別: [unit / story]
   テストファイル: [パス]
   実装ファイル:   [パス]
   テスト数:       [N] tests
   ステータス:     ALL PASS
   ────────────────────────────────────
   ```

2. **次のアクション**をユーザーに提示：
   - 🔄 **次のテストケースを追加** — 同じ対象に別のテストを追加してサイクルを繰り返す
   - 🆕 **新しいTDDサイクルを開始** — 別の対象で `/tdd` を再実行
   - ✅ **完了** — 作業終了

## Error Handling

- **インポートエラー**: 空のスタブ実装ファイルを先に作成（Phase 1 の手順3参照）
- **Playwright未インストール**: `npx playwright install chromium` を実行してからリトライ
- **リグレッション検出**: 変更を切り戻し、原因を分析してユーザーに報告。修正方針を相談
- **テストタイムアウト**: タイムアウト時間の延長を検討、非同期処理の見直しを提案

## Project Context

- Next.js 16 + React 19 + TypeScript 5 (App Router)
- CSS Modules + CSS Custom Properties（外部UIライブラリ不使用）
- パス別名: `@/*` → `./src/*`
- テスト: Vitest 4 + Playwright（Storybook連携）
- Storybook 10: `@storybook/nextjs-vite`
- コンポーネント構成: `ComponentName/ComponentName.tsx` + `.module.css` + `.stories.tsx` + `index.ts`
- データ層: `src/data/` (JSON) + `src/lib/data/` (CRUD関数)
- 型定義: `src/types/` (entities.ts, horror.ts, ui.ts)

## Example Usage

```
/tdd isValidEmail ユーティリティ関数を作成 --type unit
/tdd Button コンポーネントに fullWidth プロパティを追加 --type story
/tdd src/lib/utils/format.ts に formatDate 関数を追加
/tdd Badge コンポーネントの variant に "warning" を追加
```
