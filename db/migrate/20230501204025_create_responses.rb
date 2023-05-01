class CreateResponses < ActiveRecord::Migration[7.0]
  def change
    create_table :responses do |t|
      t.text :answer, null:false
      t.references :question, foreign_key: true, null: false
      t.references :submission, foreign_key: true, null: false
      t.timestamps
    end
  end
end
