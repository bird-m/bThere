class Api::UsersController < ApplicationController

  wrap_parameters include: User.attribute_names + ['password']

  def create

    email = params[:email]
    password = params[:password]
    phone = params[:phone]

    @user = User.new(email: email, password: password)

    if (@user.save)
      login!(@user)
      render 'api/users/show'
    else
      render json: {errors: @user.errors.full_messages}, status: :unprocessable_entity
    end
  end


  # private

  # def user_params
  #   params.require(:user).permit(:email, :password)
  # end
end
