class Api::QuestionsController < ApplicationController
  
  def create
    debugger
    render json: "you have gotten here"
  end

  def show
    if(!logged_in?)
      render json: { errors: ['Only logged in users may access this type of data'] }, status: :unauthorized
      return
    end

    @question = Question.find_by(id: params[:id])

    if (@question && (@question.user.id == current_user.id))
      puts "****RENDERING****"
      @user_id = @question.user.id
      render 'api/questions/show'
    elsif (@question)
      render json: { errors: ['The user does not have access to this data'] }, status: :unauthorized
    else
      render json: {errors: @question.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def index

    if(!logged_in?)
      render json: { errors: ['Only logged in users may access this type of data'] }, status: :unauthorized
      return
    end

    @form = Form.find_by(id: params[:form_id])

    # if the form exists and it belongs to the current user

    
    if (@form && (@form.user.id == current_user.id))
      @questions = @form.questions
      # debugger
      render 'api/questions/index'
    elsif (@form)
      render json: { errors: ['The user does not have access to this data'] }, status: :unauthorized
    else
      render json: {errors: @form.errors.full_messages}, status: :unprocessable_entity
    end
  end
end
