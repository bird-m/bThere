class UpdateCustomUrlNoIndex < ActiveRecord::Migration[7.0]
  def change
    remove_index :forms, :custom_url
  end
end
