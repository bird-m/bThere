# == Schema Information
#
# Table name: responses
#
#  id            :bigint           not null, primary key
#  answer        :text             not null
#  question_id   :bigint           not null
#  submission_id :bigint           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
class Response < ApplicationRecord

    validates :answer, presence: true

    belongs_to :submission, 
        foreign_key: :submission_id,
        class_name: :Submission,
        inverse_of: :responses

    belongs_to :question,
        foreign_key: :question_id,
        class_name: :Question,
        inverse_of: :responses
end
