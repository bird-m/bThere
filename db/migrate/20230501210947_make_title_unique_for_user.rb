class MakeTitleUniqueForUser < ActiveRecord::Migration[7.0]
  def change
    add_index :forms, [:user_id, :title], unique: true
  end
end
