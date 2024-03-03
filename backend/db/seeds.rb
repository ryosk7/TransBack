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
      thumbnail: "https://www.figma.com/file/6FO1B2lLBCd14Bbvigf4mV/image/44c86f36adeeca722e64bf233d774a08dce59de6",
      price: 0.1,
      organization_id: 1,
      created_at: Time.current,
      updated_at: Time.current
    },
    {
      title: "フレッシュな野菜と胸肉のサラダ 自家製シーザードレッシングでどうぞ！",
      detail: "フレッシュな野菜と胸肉のサラダ 自家製シーザードレッシングでどうぞ！",
      thumbnail: "https://www.figma.com/file/6FO1B2lLBCd14Bbvigf4mV/image/2be7a7fafa6747caaeefb65ae63f0aef131a4335",
      price: 0.1,
      organization_id: 2,
      created_at: Time.current,
      updated_at: Time.current
    },
    {
      title: "冬にピッタリな、カフェラテ。トールサイズ。",
      detail: "冬にピッタリな、カフェラテ。トールサイズ。",
      thumbnail: "https://www.figma.com/file/6FO1B2lLBCd14Bbvigf4mV/image/461bb26f7d1aa4b0cd5d86dd97bf491f077b9a56",
      price: 0.1,
      organization_id: 3,
      created_at: Time.current,
      updated_at: Time.current
    }
  ]

Coupon.insert_all!(coupons)
