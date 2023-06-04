class UpdateCustomUrl < ActiveRecord::Migration[7.0]
  def change
    change_column :forms, :custom_url, :string, null: true, index: {unique: false}
  end
end
