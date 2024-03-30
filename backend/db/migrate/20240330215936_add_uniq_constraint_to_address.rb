class AddUniqConstraintToAddress < ActiveRecord::Migration[7.1]
  def change
    add_index :users, :address, unique: true
  end
end
