json.extract! coupon, :id, :title, :thumbnail, :detail, :price, :organization_id, :code, :created_at, :updated_at
json.organization_name coupon.organization.name
json.url coupon_url(coupon, format: :json)
