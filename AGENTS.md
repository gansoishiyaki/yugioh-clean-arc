# AGENTS.md — ガイドライン（このリポジトリ全体に適用）

このリポジトリは「クリーンアーキテクチャ」を最小構成で体験できる React + Vite + TypeScript のサンプルです。作業するエージェントは、以下の構造・方針・コーディング規約を守ってください。

## 構成と依存関係

- `src/domain`（ビジネスルール）
  - エンティティとリポジトリのインターフェースのみ。
  - 依存先: なし（最下層）。
- `src/application`（ユースケース）
  - アプリケーションの入力/出力ルール（ロジック）。
  - 依存先: `domain` のみ。UI/インフラには依存しない。
- `src/infrastructure`（実装詳細）
  - リポジトリ実装（JSON/YAMLなどのデータ取得・パース・正規化）。
  - 依存先: `domain` のみ（`application`/`presentation` には依存しない）。
- `src/presentation`（UI）
  - React コンポーネント。ユースケースを呼び出す。DIはシンプルにコンポーネント側で行ってよい。
  - 依存先: `application` と型参照としての `domain`。
- `public/data`（サンプルデータ）
  - `cards.json`, `cards.yml` を配置。ブラウザ `fetch` で取得。

依存の方向は常に「presentation → application → domain」に向かい、`infrastructure` は `domain` に従う（実装は差し替え可能）。

## データ仕様（Card）

- 型定義: `src/domain/entities/Card.ts`
- 必須フィールド:
  - `name: string`
  - `attack: number`
  - `defense: number`
  - `attribute: string`
  - `level: number`（UIでは★表示）
- フォーマットが不正な場合でもクラッシュしないよう、インフラ層で正規化（欠損時は既定値: 文字列は空、数値は0）。

## リポジトリ（Clean Architecture 例）

- IF: `src/domain/repositories/CardRepository.ts`
  - 署名: `getAll(): Promise<Card[]>`
- 実装例:
  - JSON: `src/infrastructure/repositories/JsonCardRepository.ts`
  - YAML: `src/infrastructure/repositories/YamlCardRepository.ts`
- 新しいデータソースを追加する場合:
  1) `CardRepository` を実装したクラスを `infrastructure` に追加
  2) データの正規化関数を必ず用意
  3) `presentation` から差し替え可能に（既存の切替UIに統合）
- 外部ネットワークやサードパーティAPIへの新規依存は追加しない（サンプルの範囲を維持）。

## ユースケース

- 既存: `SearchCardsByName`（部分一致・大小無視）
- 拡張する場合は新たなユースケースを `src/application/usecases` に追加。
  - 例: レベルや属性での絞り込み、ソートなど。
  - UIロジック・状態管理は `presentation` 側で行う。

## UI方針

- 表示要件:
  - 該当件数、名前、攻撃力、防御力、属性、レベル（★表示）
- プレゼンテーション層は副作用を限定し、データ取得はユースケース経由。
- 小規模のためリポジトリの生成は `App.tsx` の `useMemo` で可。規模拡大時はインフラ側にFactoryを追加。

## ビルド・実行

- スクリプト:
  - `npm run dev`（開発/HMR）
  - `npm run build`（ビルド）
  - `npm run preview`（ビルド済みのプレビュー）
- HMR:
  - ローカルはデフォルト設定で動作。
  - Codespaces は以下で安定化済み:
    - `vite.config.ts` の `server.hmr.clientPort = 443` と `server.watch.usePolling = true`
    - `.devcontainer/devcontainer.json` の `containerEnv.CHOKIDAR_USEPOLLING = true`

## コーディング規約

- 既存の型・命名・ファイル構成を踏襲し、最小差分で変更する。
- TypeScript は `strict`。暗黙の any を避ける。
- 下位層（domain/application）に UI/React 依存を入れない。
- 例外はインフラ層で捕捉/変換する（UIまで漏らさないのが理想だが、簡易版ではエラーメッセージ文字列でOK）。
- 正規化関数で入力データの安全性を担保（既定値付与）。
- コードは英語、UI文言は日本語でOK。
- 不要な外部ライブラリを追加しない。

## テスト

- 現状テストは未導入。要求がある場合のみ、`vitest` を導入してユースケースや正規化関数の単体テストを追加する。
- UIのスナップショットテストは範囲外（サンプルの簡潔性を維持）。

## 変更手順の目安

- フィールド追加/変更:
  1) `Card` 型を更新
  2) インフラ層の正規化関数を更新
  3) サンプルデータ（JSON/YAML）を更新
  4) 表示・検索仕様に応じてユースケース/コンポーネントを更新
- 新しい検索条件:
  - 新ユースケースを追加し、UIから呼び出す。

## Do / Don’t

- Do: レイヤ境界を守る、差し替え可能性を保つ、最小変更で目的達成。
- Don’t: 下位層から上位層へ依存、UIから直接データファイルを操作、外部API依存を追加。

このAGENTS.mdのスコープはリポジトリ全体です。以後の変更は本ポリシーに従ってください。
