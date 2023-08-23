class AddCustomIndex < ActiveRecord::Migration[7.0]
  def change
    add_index :users, :email, unique: true, where: 'email IS NOT NULL'
    add_index :users, :phone, unique: true, where: 'phone IS NOT NULL'
  end
end
