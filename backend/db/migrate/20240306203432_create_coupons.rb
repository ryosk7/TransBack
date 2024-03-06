class CreateCoupons < ActiveRecord::Migration[7.1]
  def change
    create_table :coupons do |t|
      t.string :title
      t.text :detail
      t.float :price
      t.references :organization, null: false, foreign_key: true

      t.timestamps
    end
  end
end
