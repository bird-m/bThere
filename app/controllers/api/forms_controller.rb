class Api::FormsController < ApplicationController
  def index

    if logged_in?
      puts "****I AM HERE****"
      @forms = current_user.forms
      render 'api/forms/index'
    else
      puts "****NOT LOGGED IN****"
      render json: { errors: ['You must log in to view this page'] }, status: :unauthorized
    end
  end
end
