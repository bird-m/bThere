class AddPhone < ActiveRecord::Migration[7.0]
  def change
    change_column :users, :email, :string, null: true
    add_column :users, :phone, :string
  end
end
