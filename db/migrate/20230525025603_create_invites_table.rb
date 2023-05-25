class CreateInvitesTable < ActiveRecord::Migration[7.0]
  def change
    create_table :invites do |t|
      t.references :contact, null:false, foreign_key: {to_table: :contacts}
      t.references :form, null:false, foreign_key: {to_table: :forms}, index: false
      t.timestamps
    end

    add_index :invites, [:form_id, :contact_id], unique: true
  end
end
