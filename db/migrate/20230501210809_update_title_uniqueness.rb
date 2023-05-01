class UpdateTitleUniqueness < ActiveRecord::Migration[7.0]
  def change
    remove_index :forms, :title
    change_column :forms, :title, :string, null: false
  end
end
