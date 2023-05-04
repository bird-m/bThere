class AddColumnToSubmissions < ActiveRecord::Migration[7.0]
  def change
    add_column :submissions, :status, :string, null:false, default: "maybe"
    add_column :submissions, :name, :string, null:false, default: "Doe"
    add_column :submissions, :email, :string, null:false, default: "doe@unknown.com"
  end
end

# t.boolean :required, null:false, default: false