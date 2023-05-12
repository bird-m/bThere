class CreateContacts < ActiveRecord::Migration[7.0]
  def change
    create_table :contacts do |t|
      t.string :email, null:false, index: {unique: true}
      t.references :user, null:false, foreign_key: {to_table: :users}
      t.timestamps
    end
  end
end
