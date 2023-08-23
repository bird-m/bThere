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

  attr_reader :code
  before_validation :ensure_session_token

  # validates :email, :session_token, :password_digest, presence: true
  validates :session_token, presence: true
  validate :credential_present
  validate :check_code, on: :create
  validate :cred_provided, on: :create

  validates :email, :session_token, uniqueness: true
  # validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, allow_nil: true
  validates :password, length: {minimum: 7}, allow_nil: true

  def credential_present
    if (email.blank? && phone.blank?)
      errors.add(:base, "Either email or phone must be present")
    elsif(email.present? && phone.present?)
      errors.add(:base, "User cannot have both email and password")
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

  def self.find_by_credentials(email, password, phone, code)
    
    user = nil;

    if(email.present?)
      user = User.find_by(email: email)
    elsif (phone.present?)
      user = User.find_by(phone: phone)
    end
    
    if (user && user.email.present? && user.authenticate(password))
      return user
    elsif (user && user.phone.present? && user.verify_otp(code))
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

  def code=(code)
    @code = code
  end

  def verify_otp(check_code)
    begin
      debugger

      client = Twilio::REST::Client.new(ENV['twilio_account_sid'], ENV['twilio_auth_token'])

      debugger

      verification_check = client.verify
      .v2
      .services(ENV['twilio_bThere_verify_service_sid'])
      .verification_checks
      .create(to: phone, code: check_code)

      debugger
      return verification_check.status == 'approved'
    rescue Twilio::REST::TwilioError => e
      return false
    end
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

  def check_code
    if(code.present? && !verify_otp(code))
      errors.add(:base, "Invalid code")
    end
  end

  def cred_provided
    if (email.present? && password.blank?)
      errors.add(:base, "Password must be provided with email")
    elsif (phone.present? && code.blank?)
      errors.add(:base, "Code must be provided with phone")
    end
  end

end
