class AddColumnToSubmissions < ActiveRecord::Migration[7.0]
  def change
    add_column :submissions, :status, :string, null:false, default: "decline"
    add_column :submissions, :name, :string, null:false, default: "John Doe"
    add_column :submissions, :email, :string, null:false, default: "do@filler.com"
  end
end

# t.boolean :required, null:false, default: false