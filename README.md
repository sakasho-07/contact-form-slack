# Contact Form with Slack Notification

Next.js・TypeScript・Zodを使用して作成したお問い合わせフォームです。

フォームから送信された内容をサーバー側で検証し、問題がなければSlackに通知する仕組みを実装しました。

## 1. デモ・リポジトリ

- **公開サイト:** https://contact-form-slack-five.vercel.app/
- **GitHub:** https://github.com/sakasho-07/contact-form-slack

## 2. 使用技術

- Next.js
- React
- TypeScript
- Tailwind CSS
- Zod
- Slack Incoming Webhooks
- Vercel

## 3. 実装した機能

- 名前・メールアドレス・お問い合わせ内容の入力フォーム
- Zodによる入力内容のバリデーション
- 空欄や不正なメールアドレスの入力チェック
- API Routeを利用したサーバー側での入力検証
- Slack Incoming Webhooksによる通知
- 送信中・送信成功・送信失敗のメッセージ表示
- エラー発生時のログ出力

## 4. 処理の流れ

1. ユーザーがフォームに入力する
2. ブラウザ側で入力内容をチェックする
3. `fetch` を使って `/api/contact` にPOSTリクエストを送る
4. `app/api/contact/route.ts` で受け取ったデータをZodで検証する
5. 入力内容に問題がなければ、Slack Webhookを利用して通知する
6. APIから返された結果を画面に表示する

## 5. 環境変数の設定

SlackのWebhook URLは、セキュリティのため環境変数で管理しています。

プロジェクトのルートディレクトリに `.env.local` を作成し、以下のように設定します。

```env
SLACK_WEBHOOK_URL="取得したSlack Webhook URL"
```

※ 実際のWebhook URLは公開しないでください。  
※ `.env.local` はGitHubにアップロードしないように管理しています。  
※ Vercelにも同じ環境変数を設定しています。

## 6. ローカルでの起動方法

必要なパッケージをインストールします。

```bash
npm install
```

開発サーバーを起動します。

```bash
npm run dev
```

ブラウザで以下にアクセスします。

```text
http://localhost:3000
```

## 7. 今回学んだこと

### フロントエンド

- `useState` を使って入力内容や画面の状態を管理する方法
- `fetch` を使ってAPIにデータを送信する方法
- `async / await` を使った非同期処理
- 送信中・成功・失敗に応じて画面表示を切り替える方法

### バックエンド・API

- Next.jsのAPI Routeの役割
- `POST` リクエストでデータを受け取る方法
- `request.json()` でリクエストのデータを取り出す方法
- サーバー側で入力内容を検証する重要性
- `Response.json()` で結果を返す方法

### バリデーション

- Zodを使った入力内容の検証
- `safeParse()` による成功・失敗の判定
- 入力エラーに応じたメッセージの表示

### Slack連携・環境変数

- Incoming Webhooksを使った外部サービスとの連携
- `fetch` でSlackにPOSTリクエストを送る方法
- 環境変数を使って秘密情報を管理する方法
- `.env.local` をGitHubに公開しないための管理

### Git・GitHub・Vercel

- Gitで変更履歴を保存する方法
- GitHubにソースコードをPushする方法
- GitHubとVercelを連携してWebサイトを公開する方法
- 環境変数を変更した後に再デプロイが必要になること

## 8. つまずいた点と解決方法

### Slackに通知が届かない

ローカル環境では通知が届いていましたが、Vercelの本番環境では通知が届きませんでした。

原因は、Vercelに登録していたWebhook URLが、ローカル環境で使用していたURLと異なっていたことでした。

Vercel側の環境変数を正しいURLに修正し、再デプロイすることで解決しました。

この経験から、ローカル環境と本番環境では環境変数をそれぞれ設定する必要があることを学びました。