# == Schema Information
#
# Table name: submissions
#
#  id         :bigint           not null, primary key
#  form_id    :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  status     :string           default("maybe"), not null
#  name       :string           default("Doe"), not null
#  email      :string           default("doe@unknown.com"), not null
#
class Submission < ApplicationRecord

    ALLOWED_STATUS = ['accept','decline','maybe'].freeze

    validates :status, :name, :email, presence: true
    validates :status, inclusion: {in: ALLOWED_STATUS}

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
