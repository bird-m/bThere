class AddColumnToSubmissions < ActiveRecord::Migration[7.0]
  def change
    add_column :submissions, :status, :string, null:false
    add_column :submissions, :name, :string, null:false
    add_column :submissions, :email, :string, null:false
  end
end

# t.boolean :required, null:false, default: false