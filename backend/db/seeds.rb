# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

Organization.destroy_all
Coupon.destroy_all

Organization.create(name: "McDonald's")
Organization.create(name: "Uber Eats")
Organization.create(name: "Starbucks")
Organization.create(name: "ユニクロ")
Organization.create(name: "Neflix")
Organization.create(name: "Amazon")

coupons =
  [
    {
      title: "とろーりチーズとカリカリのベーコンのビッグマック",
      detail: "とろーりチーズとカリカリのベーコンのビッグマック",
      thumbnail: "../../assets/images/coupon-image-1.png",
      price: 1500,
      organization_id: 1,
      code: Coupon.generate_code,
      created_at: Time.current,
      updated_at: Time.current
    },
    {
      title: "フレッシュな野菜と胸肉のサラダ自家製シーザードレッシングでどうぞ！",
      detail: "フレッシュな野菜と胸肉のサラダ自家製シーザードレッシングでどうぞ！",
      thumbnail: "../../assets/images/coupon-image-2.png",
      price: 1200,
      organization_id: 2,
      code: Coupon.generate_code,
      created_at: Time.current,
      updated_at: Time.current
    },
    {
      title: "冬にピッタリな、カフェラテ。トールサイズ。",
      detail: "冬にピッタリな、カフェラテ。トールサイズ。",
      thumbnail: "../../assets/images/coupon-image-3.png",
      price: 1000,
      organization_id: 3,
      code: Coupon.generate_code,
      created_at: Time.current,
      updated_at: Time.current
    },
    {
      title: "ウルトラストレッチドライEXプリントフルジップパーカ",
      detail: "ウルトラストレッチドライEXプリントフルジップパーカ",
      thumbnail: "../../assets/images/coupon-image-4.png",
      price: 6500,
      organization_id: 4,
      code: Coupon.generate_code,
      created_at: Time.current,
      updated_at: Time.current
    },
    {
      title: "Neflix プレミアムプラン",
      detail: "Neflix プレミアムプラン",
      thumbnail: "../../assets/images/coupon-image-5.png",
      price: 1300,
      organization_id: 5,
      code: Coupon.generate_code,
      created_at: Time.current,
      updated_at: Time.current
    },
    {
      title: "Amazon ギフト券",
      detail: "Amazon ギフト券",
      thumbnail: "../../assets/images/coupon-image-6.png",
      price: 5000,
      organization_id: 6,
      code: Coupon.generate_code,
      created_at: Time.current,
      updated_at: Time.current
    }
  ]

Coupon.insert_all!(coupons)
