FactoryBot.define do
  factory :coupon do
    title { "MyString" }
    detail { "MyText" }
    price { 1.5 }
    organization { nil }
  end
end
