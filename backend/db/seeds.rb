# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

Organization.create(name: Faker::Company.name)

coupons = 
  5.times.map do
    { title: Faker::Commerce.product_name, detail: Faker::Lorem.paragraph, thumbnail: Faker::LoremFlickr.image  ,price: Faker::Commerce.price, organization_id: Organization.first.id, created_at: Time.current, updated_at: Time.current }
  end

Coupon.insert_all!(coupons)
