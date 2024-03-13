![thumbnail_transback](https://github.com/ryosk7/TransBack/assets/17314812/bc2e69c1-643b-487a-9c4c-bbf1510d89e1)

# TransBack
資産が増えて、ウハウハダァってなっても、円に変えると所得税やら確定申告やらが付き纏ってきますよね。なんで円に変えたいんだっけという発想からこのアプリを作成しました。
個人はNPO法人に対して寄付をしてクーポンコードを獲得、NPO法人は企業に対して、集金したものを送金。こうすることで、非課税で年間110万円分のクーポンを獲得することができてしまいます。
食事やサービスなど、さまざまなクーポンコードと変換できる社会を作りたいです。

## Setup

```shell
cd backend && rails db:migrate
cd frontend && npm ci
```

## Boot

```shell
cd backend && rails s
cd frontend && ionic s
```

## Deploy

```shell
cd backend && fly deploy
cd frontend && ionic build --prod && firebase deploy
```
