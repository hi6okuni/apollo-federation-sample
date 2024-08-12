# reviews/Dockerfile (movies/Dockerfile も同様に修正)
FROM golang:1.22-alpine AS builder

WORKDIR /app

# SQLite と GCC のインストール
RUN apk add --no-cache gcc musl-dev

# 依存関係のコピーとダウンロード
COPY go.mod go.sum ./
RUN go mod download

# ソースコードのコピーとビルド
COPY . .
# CGO_ENABLED=1 に変更し、静的リンクのフラグを追加
RUN CGO_ENABLED=1 GOOS=linux go build -a -ldflags '-extldflags "-static"' -o main .

# 実行用の軽量イメージ
FROM alpine:3.18
RUN apk --no-cache add ca-certificates

WORKDIR /root/

# ビルドしたバイナリをコピー
COPY --from=builder /app/main .

# アプリケーションの起動
CMD ["./main"]

