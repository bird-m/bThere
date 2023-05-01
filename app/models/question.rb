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
    validates :prompt, presence: true
    validates :required, inclusion: {in: [true, false]}
    validates :prompt, uniqueness: {scope: :form_id}


    belongs_to :form,
        class_name: :Form,
        foreign_key: :form_id,
        inverse_of: :questions

    has_one :user,
        through: :form,
        source: :user

    has_many :responses,
        class_name: :Response,
        foreign_key: :question_id,
        inverse_of: :question
        # not dependent destroying as a question should only be deleted by destroying the submission
end
    
    # belongs_to :user,
    #     through: :form,
    #     source: :user