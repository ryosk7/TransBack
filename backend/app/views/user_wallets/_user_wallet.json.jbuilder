json.extract! user_wallet, :id, :address, :name, :avatar, :created_at, :updated_at
json.url user_wallet_url(user_wallet, format: :json)
