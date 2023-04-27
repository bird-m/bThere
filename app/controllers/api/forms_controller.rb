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

  def create
    debugger
    if !logged_in?
      render json: { errors: ['You must log in to view this page'] }, status: :unauthorized
    end

    @form = Form.new(form_params)
    @form.user_id = current_user.id
    @form.status = 'Open'
    if(@form.save)
      # debugger
      render 'api/forms/show'
    else
      render json: {errors: @form.errors.full_messages}, status: :unprocessable_entity
    end
  end

  private

  def form_params
    params.require(:form).permit(:title, :description, :custom_url)
  end

end
