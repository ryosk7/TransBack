class User < ApplicationRecord
  has_many :user_coupons

  def total_purchase_amount
    user_coupons.includes(:coupon).sum(:price)
  end
  
end
