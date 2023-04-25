class CreateForms < ActiveRecord::Migration[7.0]
  def change
    create_table :forms do |t|
      t.string :title, null: false, index: {unique: true}
      t.string :description
      t.string :status, null: false
      t.references :user, null:false, foreign_key: {to_table: :users}
      t.timestamps
    end
  end
end
