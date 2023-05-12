# == Schema Information
#
# Table name: forms
#
#  id          :bigint           not null, primary key
#  title       :string           not null
#  description :string
#  status      :string           not null
#  user_id     :bigint           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  custom_url  :string           not null
#  restricted  :boolean          default(FALSE)
#
class Form < ApplicationRecord

    validates :title, :status, presence: true
    validates :title, uniqueness: {scope: :user_id}
    validates :custom_url, uniqueness: true, allow_nil: true
    validates :restricted, inclusion: {in: [true, false]}

    has_one_attached :photo

    belongs_to :user,
        class_name: :User,
        foreign_key: :user_id,
        inverse_of: :forms

    has_many :questions,
        class_name: :Question,
        foreign_key: :form_id,
        inverse_of: :form,
        dependent: :destroy

    has_many :submissions,
        class_name: :Submission,
        foreign_key: :form_id,
        inverse_of: :form,
        dependent: :destroy

    has_many :responses,
        through: :submissions,
        source: :responses
end
