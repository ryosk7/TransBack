class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.text :address
      t.string :name
      t.text :avatar

      t.timestamps
    end
  end
end
