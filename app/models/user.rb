# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  has_secure_password

  before_validation :ensure_session_token

  validates :email, :session_token, :password_digest, presence: true
  validates :email, :session_token, uniqueness: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, length: {minimum: 7}, allow_nil: true

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
  end

  def gen_session_token
    token = SecureRandom::urlsafe_base64

    while User.find_by(session_token: token)
      token = token = SecureRandom::urlsafe_base64
    end

    return token
  end

end
