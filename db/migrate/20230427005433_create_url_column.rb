class CreateUrlColumn < ActiveRecord::Migration[7.0]
  def change
    add_column :forms, :custom_url, :string, null:false, index: {unique: true}
  end
end
