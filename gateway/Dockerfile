# gateway/Dockerfile
FROM oven/bun:1 as base
WORKDIR /app

# 依存関係のインストール
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# ソースコードのコピー
COPY . .

# 環境変数の設定
ENV HOST=0.0.0.0

# アプリケーションの起動
CMD ["bun", "run", "start"]
