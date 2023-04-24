class Api::SessionsController < ApplicationController

  # before_action :require_logged_in, only: [:show]

  def show
    # debugger
    # ban
    if logged_in?
      @user = current_user
      render 'api/users/show'
    else
      render json: {user: nil}
    end
  end

  def create
    print params
    puts
    debugger
    email = params[:email]
    password = params[:password]

    @user = User.find_by_credentials(email, password)
    
    if(@user)
      login!(@user)
      render 'api/users/show'
    else
      puts "****************"
      print "this is the else"
      puts "****************"
      render json: { errors: ['The provided credentials were invalid.'] }, status: :unauthorized
    end
  end

  def destroy
    puts "destroying"
      logout!
  end
end
