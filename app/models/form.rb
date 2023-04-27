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
#
class Form < ApplicationRecord

    validates :title, :status, presence: true
    validates :title, uniqueness: true
    validates :custom_url, uniqueness: true, allow_nil: true

    belongs_to :user,
        class_name: :User,
        foreign_key: :user_id,
        inverse_of: :forms

    has_many :questions,
        class_name: :Question,
        foreign_key: :form_id,
        inverse_of: :form

end
