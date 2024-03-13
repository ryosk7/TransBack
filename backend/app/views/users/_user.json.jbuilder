json.extract! user, :id, :address, :name, :avatar, :created_at, :updated_at
json.url user_url(user, format: :json)
json.total_purchase_amount user.total_purchase_amount
