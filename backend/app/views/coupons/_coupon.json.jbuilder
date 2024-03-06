json.extract! coupon, :id, :title, :detail, :price, :organization_id, :created_at, :updated_at
json.url coupon_url(coupon, format: :json)
