class Api::OtpsController < ApplicationController

  def send_otp
    # puts "I AM IN THE SEND"
    # debugger;

    if params[:phone].length != 12
      render json: { errors: ['Invalid phone number'] }, status: :unprocessable_entity
      return
    end

    # if true
    #   render json: { phone: '+14158236738' }, status: :ok
    #   return
    # end

    client = Twilio::REST::Client.new(ENV['twilio_account_sid'], ENV['twilio_auth_token'])

    verification = client.verify
    .v2
    .services(ENV['twilio_bThere_verify_service_sid'])
    .verifications
    .create(to: params[:phone], channel: 'sms')

    if verification.status == 'pending'
      render json: { phone: params[:phone] }, status: :ok
    else
      render json: { errors: ['Twilio SMS service error'] }, status: :unprocessable_entity
    end
  end

  # def verify_otp

  #   if params[:phone].length != 12
  #     render json: { errors: ['Invalid phone number'] }, status: :unprocessable_entity
  #     return
  #   end

  #   debugger

  #   client = Twilio::REST::Client.new(ENV['twilio_account_sid'], ENV['twilio_auth_token'])

  #   verification_check = client.verify
  #   .v2
  #   .services(ENV['twilio_bThere_verify_service_sid'])
  #   .verification_checks
  #   .create(to: params[:phone], code: params[:code])

  #   debugger

  #   if verification_check.status == 'approved'
  #     # we would create a new user here and log them in
  #     debugger
  #     render json: { message: 'OTP verification successful' }, status: :ok
  #   else
  #     render json: { errors: ['Code not recognized'] }, status: :unprocessable_entity
  #   end
  # end

  private

end