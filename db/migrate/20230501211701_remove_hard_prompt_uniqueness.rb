class RemoveHardPromptUniqueness < ActiveRecord::Migration[7.0]
  def change
    remove_index :questions, :prompt
    change_column :questions, :prompt, :string, null: false

    # remove_index :forms, :title
    # change_column :forms, :title, :string, null: false
  end
end
