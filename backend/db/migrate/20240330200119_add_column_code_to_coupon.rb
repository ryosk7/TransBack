class AddColumnCodeToCoupon < ActiveRecord::Migration[7.1]
  def change
    add_column :coupons, :code, :text
  end
end
