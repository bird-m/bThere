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
#
class Form < ApplicationRecord

    validates :title, :status, presence: true
    validates :title, uniqueness: true

    belongs_to :user,
        class_name: :User,
        foreign_key: :user_id,
        inverse_of: :forms

end
