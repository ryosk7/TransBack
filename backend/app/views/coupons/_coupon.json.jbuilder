json.extract! coupon, :id, :title, :thumbnail, :detail, :price, :organization_id, :created_at, :updated_at
json.orgaization_name coupon.organization.name
json.url coupon_url(coupon, format: :json)
