# == Schema Information
#
# Table name: questions
#
#  id          :bigint           not null, primary key
#  prompt      :string           not null
#  description :string
#  required    :boolean          default(FALSE), not null
#  form_id     :bigint           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Question < ApplicationRecord
    validates :prompt, :required, presence: true
    validates :prompt, uniqueness: true

    belongs_to :form,
        class_name: :Form,
        foreign_key: :form_id,
        inverse_of: :questions
end
