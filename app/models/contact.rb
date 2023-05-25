# == Schema Information
#
# Table name: contacts
#
#  id         :bigint           not null, primary key
#  email      :string           not null
#  user_id    :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Contact < ApplicationRecord

    validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }

    belongs_to :user,
        class_name: :User,
        foreign_key: :user_id,
        inverse_of: :contacts

    has_many :invites,
        class_name: :Invite,
        foreign_key: :contact_id,
        inverse_of: :contact,
        dependent: :destroy
end
