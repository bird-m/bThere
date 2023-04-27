class AddIndex < ActiveRecord::Migration[7.0]
  def change
    add_index :forms, :custom_url, unique: true
  end
end
