# == Schema Information
#
# Table name: invites
#
#  id         :bigint           not null, primary key
#  contact_id :bigint           not null
#  form_id    :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Invite < ApplicationRecord

    validates :contact_id, uniqueness: {scope: :form_id}

    belongs_to :contact,
        class_name: :Contact,
        foreign_key: :contact_id,
        inverse_of: :invites

    belongs_to :form,
        class_name: :Form,
        foreign_key: :form_id,
        inverse_of: :invites
end