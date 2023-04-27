class CreateQuestions < ActiveRecord::Migration[7.0]
  def change
    create_table :questions do |t|
      t.string :prompt, null:false, index: {unique: true}
      t.string :description
      t.boolean :required, null:false, default: false
      t.references :form, foreign_key: true, null:false
      t.timestamps
    end
  end
end
