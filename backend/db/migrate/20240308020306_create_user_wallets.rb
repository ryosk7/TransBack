class CreateUserWallets < ActiveRecord::Migration[7.1]
  def change
    create_table :user_wallets do |t|
      t.text :address
      t.string :name
      t.text :avatar

      t.timestamps
    end
  end
end
