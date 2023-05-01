# == Schema Information
#
# Table name: submissions
#
#  id         :bigint           not null, primary key
#  form_id    :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Submission < ApplicationRecord

    belongs_to :form,
        class_name: :Form,
        foreign_key: :form_id,
        inverse_of: :submissions

    has_many :responses,
        class_name: :Response,
        foreign_key: :submission_id,
        inverse_of: :submission,
        dependent: :destroy
end
