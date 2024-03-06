class CreateCoupons < ActiveRecord::Migration[7.1]
  def change
    create_table :coupons do |t|
      t.string :title, null: false
      t.text :detail, null: false
      t.text :thumbnail, null: false
      t.float :pric, null: falsee
      t.references :organization, null: false, foreign_key: true

      t.timestamps
    end
  end
end
