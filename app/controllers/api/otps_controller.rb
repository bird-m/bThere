class Api::OtpsController < ApplicationController

  def send

    if params[:phone].length != 12
      render json: { errors: ['Invalid phone number'] }, status: :unprocessable_entity
      return
    end

    client = Twilio::REST::Client.new(ENV['twilio_account_sid'], ENV['twilio_auth_token'])

    verification = client.verify
      .v2
      .services(ENV['twilio_bThere_verify_service_sid'])
      .verifications
      .create(to: params[:phone], channel: 'sms')

      if verification.status == 'pending'
        render json: { message: 'Verification sent successfully' }, status: :ok
      else
        render json: { errors: ['Twilio SMS service error'] }, status: :unprocessable_entity
      end
  end

  # def verify
  # end
end