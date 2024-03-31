![thumbnail_transback](https://github.com/ryosk7/TransBack/assets/17314812/bc2e69c1-643b-487a-9c4c-bbf1510d89e1)

# TransBack

資産が増えて、ウハウハダァってなっても、円に変えると所得税やら確定申告やらが付き纏ってきますよね。なんで円に変えたいんだっけという発想からこのアプリを作成しました。
個人は NPO 法人に対して寄付をしてクーポンコードを獲得、NPO 法人は企業に対して、集金したものを送金。こうすることで、非課税で年間 110 万円分のクーポンを獲得することができてしまいます。
食事やサービスなど、さまざまなクーポンコードと変換できる社会を作りたいです。

[詳しい説明](https://github.com/ryosk7/TransBack/blob/main/NEMTUS_HACKATHON_TransBack.pdf)

Even if your assets increase and you feel like you're getting rich, when you convert them into yen, you have to pay income tax and file a tax return. We created this app based on the idea of why you want to convert your assets into yen.
Individuals donate to NPOs and get a coupon code, and NPOs remit the collected money to companies. In this way, they can acquire coupons worth JPY 1.1 million a year tax-free.
We want to create a society where people can convert the coupon codes into various coupon codes for meals, services, etc.

Translated with DeepL.com (free version)

[More Detail](https://github.com/ryosk7/TransBack/blob/main/NEMTUS_HACKATHON_TransBack.pdf)

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
