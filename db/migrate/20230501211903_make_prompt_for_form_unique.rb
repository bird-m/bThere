class MakePromptForFormUnique < ActiveRecord::Migration[7.0]
  def change
    add_index :questions, [:form_id, :prompt], unique: true

    # add_index :forms, [:user_id, :title], unique: true
  end
end
