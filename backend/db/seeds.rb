# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

Organization.create(name: "McDonald's")
Organization.create(name: "Uber Eats")
Organization.create(name: "Starbucks")

coupons =
  [
    {
      title: "とろーりチーズとカリカリのベーコンのビッグマック",
      detail: "とろーりチーズとカリカリのベーコンのビッグマック",
      thumbnail: "../../assets/images/coupon-image-1.png",
      price: 0.1,
      organization_id: 1,
      created_at: Time.current,
      updated_at: Time.current
    },
    {
      title: "フレッシュな野菜と胸肉のサラダ自家製シーザードレッシングでどうぞ！",
      detail: "フレッシュな野菜と胸肉のサラダ自家製シーザードレッシングでどうぞ！",
      thumbnail: "../../assets/images/coupon-image-2.png",
      price: 0.1,
      organization_id: 2,
      created_at: Time.current,
      updated_at: Time.current
    },
    {
      title: "冬にピッタリな、カフェラテ。トールサイズ。",
      detail: "冬にピッタリな、カフェラテ。トールサイズ。",
      thumbnail: "../../assets/images/coupon-image-3.png",
      price: 0.1,
      organization_id: 3,
      created_at: Time.current,
      updated_at: Time.current
    },
    {
      title: "とろーりチーズとカリカリのベーコンのビッグマック",
      detail: "とろーりチーズとカリカリのベーコンのビッグマック",
      thumbnail: "../../assets/images/coupon-image-1.png",
      price: 0.1,
      organization_id: 1,
      created_at: Time.current,
      updated_at: Time.current
    },
    {
      title: "フレッシュな野菜と胸肉のサラダ自家製シーザードレッシングでどうぞ！",
      detail: "フレッシュな野菜と胸肉のサラダ自家製シーザードレッシングでどうぞ！",
      thumbnail: "../../assets/images/coupon-image-2.png",
      price: 0.1,
      organization_id: 2,
      created_at: Time.current,
      updated_at: Time.current
    },
    {
      title: "冬にピッタリな、カフェラテ。トールサイズ。",
      detail: "冬にピッタリな、カフェラテ。トールサイズ。",
      thumbnail: "../../assets/images/coupon-image-3.png",
      price: 0.1,
      organization_id: 3,
      created_at: Time.current,
      updated_at: Time.current
    }
  ]

Coupon.insert_all!(coupons)
