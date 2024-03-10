# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_03_09_181633) do
  create_table "coupons", force: :cascade do |t|
    t.string "title", null: false
    t.text "detail", null: false
    t.text "thumbnail", null: false
    t.float "price", null: false
    t.integer "organization_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["organization_id"], name: "index_coupons_on_organization_id"
  end

  create_table "organizations", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_coupons", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "coupon_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["coupon_id"], name: "index_user_coupons_on_coupon_id"
    t.index ["user_id"], name: "index_user_coupons_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.text "address"
    t.string "name"
    t.text "avatar"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "coupons", "organizations"
  add_foreign_key "user_coupons", "coupons"
  add_foreign_key "user_coupons", "users"
end
