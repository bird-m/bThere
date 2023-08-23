class Api::UsersController < ApplicationController

  wrap_parameters include: User.attribute_names + ['password']

  def create


    email = params[:email].presence
    phone = params[:phone].presence

    password = params[:password]
    code = params[:code]

    # debugger

    @user = User.new(email: email, password: password, phone: phone, code: code)

    # debugger

    if (@user.save)
      # debugger
      login!(@user)
      render 'api/users/show'
    else
      render json: {errors: @user.errors.full_messages}, status: :unprocessable_entity
    end
  end
end
