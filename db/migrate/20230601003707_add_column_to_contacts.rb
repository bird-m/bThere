class AddColumnToContacts < ActiveRecord::Migration[7.0]
  def change
    add_column :contacts, :name, :string, null:false
  end
end