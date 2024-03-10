json.array! @user_coupons do |user_coupon|
  json.partial! 'coupons/coupon', coupon: user_coupon.coupon
end
