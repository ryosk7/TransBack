class CreateCoupons < ActiveRecord::Migration[7.0]
  def change
    create_table :coupons do |t|
      t.string :title, null: false
      t.text :detail, null: false
      t.text :thumbnail, null: false
      t.float :price, null: false
      t.references :organization, null: false, foreign_key: true

      t.timestamps
    end
  end
end
