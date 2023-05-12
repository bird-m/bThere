class AddRestrictedToForms < ActiveRecord::Migration[7.0]
  def change
    add_column :forms, :restricted, :boolean, default:false
  end
end
