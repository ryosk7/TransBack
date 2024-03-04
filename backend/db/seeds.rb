# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

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
