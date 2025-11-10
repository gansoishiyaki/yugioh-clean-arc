# 遊戯王カード検索 (Clean Architecture サンプル)

要件に沿った React SPA。クリーンアーキテクチャの例として、カードリポジトリを interface で定義し、JSON と YAML のどちらのデータソースでも動作します。GitHub Codespaces で動作確認できます。

 [![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/gansoishiyaki/yugioh-clean-arc)

## プロジェクト構成

- `src/domain` エンティティ・リポジトリの interface
- `src/application` UseCase（検索ロジック）
- `src/infrastructure` JSON/YAML リポジトリ実装（ブラウザ fetch）
- `src/presentation` React コンポーネント
- `public/data` サンプルデータ（`cards.json`, `cards.yml`）

## 使い方（Codespaces）

1. このリポジトリを Codespaces で開く
2. Devcontainer が起動後、自動で `npm install` が実行されます
3. `npm run dev` を実行
4. Port 5173 をフォワードし、ブラウザで開く

ワンクリックで起動: https://codespaces.new/gansoishiyaki/yugioh-clean-arc

## ホットリロード（HMR）

- 共通: Vite + React の Fast Refresh により、保存時に自動でUIが更新されます。

- ローカル:
  - 追加設定不要。`npm run dev` 起動中に `src/presentation` 配下を編集すると即時反映します。

- Codespaces:
  - 設定済み（変更不要）。以下によりHMRのWebSocketと監視を安定化しています。
    - `vite.config.ts` の `server.hmr.clientPort = 443`
    - `vite.config.ts` の `server.watch.usePolling = true`
    - `.devcontainer/devcontainer.json` の `containerEnv.CHOKIDAR_USEPOLLING = true`
  - `npm run dev` を実行し、フォワードされたPort 5173を開くと保存時に即時反映します。

## ローカル実行

```bash
npm install
npm run dev
```

## 仕様

- 検索は「名前」のみ（部分一致・大小無視）
- 検索結果は「該当件数」と「名前・攻撃力・防御力」を表示
- UI で JSON/YAML を切替可（同一の UseCase・Interface を利用）

## 依存

- React 18 + Vite 5 + TypeScript
- `yaml` パッケージで YAML をパース
