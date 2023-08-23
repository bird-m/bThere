# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string
#  password_digest :string
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  phone           :string
#
class User < ApplicationRecord
  has_secure_password

  before_validation :ensure_session_token

  # validates :email, :session_token, :password_digest, presence: true
  validates :session_token, presence: true
  validate :credential_present

  validates :email, :session_token, uniqueness: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, allow_nil: true
  validates :password, length: {minimum: 7}, allow_nil: true

  def credential_present
    if (email.blank? && phone.blank?)
      errors.add(:base, "Either email or phone must be present")
    elsif(email.present? && phone.present?)
      errors.add(:base, "User cannot have both email and password")
    elsif (email.present? && password.blank?)
      errors.add(:base, "Password must be provided with email")
    end
  end

  has_many :forms,
    foreign_key: :user_id,
    class_name: :Form,
    inverse_of: :user,
    dependent: :destroy

  has_many :questions,
    through: :forms,
    source: :questions

  has_many :contacts,
    class_name: :Contact,
    foreign_key: :user_id,
    inverse_of: :user,
    dependent: :destroy

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    
    if (user && user.authenticate(password))
      return user
    else
      return nil
    end
  end

  def reset_session_token!
    self.session_token = self.gen_session_token
    self.save!
    return self.session_token
  end

  private

  def ensure_session_token
    self.session_token ||= self.gen_session_token

    if(phone.present?)
      self.password = "1234567890"
    end
  end

  def gen_session_token
    token = SecureRandom::urlsafe_base64

    while User.find_by(session_token: token)
      token = token = SecureRandom::urlsafe_base64
    end

    return token
  end

end
