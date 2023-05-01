class Api::QuestionsController < ApplicationController
  
  def create
    if(!logged_in?)
      render json: { errors: ['Only logged in users may access this type of data'] }, status: :unauthorized
      return
    end
    debugger;
    @question = Question.new(new_question_params)
    form = Form.find_by(id: @question.form_id)

    if (@question && (current_user.id == form.user_id) && @question.save)
      render 'api/questions/show'
    else
      render json: {errors: @question.errors.full_messages}, status: :unprocessable_entity
    end
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

  def destroy

    if(!logged_in?)
      render json: { errors: ['Only logged in users may access this type of data'] }, status: :unauthorized
    end

    @question = Question.find_by(id: params[:id])

    if (@question && (@question.user.id == current_user.id) && @question.destroy)
      head :no_content
    else
      render json: {errors: @question.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def update

    if(!logged_in?)
      render json: { errors: ['Only logged in users may access this type of data'] }, status: :unauthorized
    end

    @question = Question.find_by(id: params[:id]);

    if (@question && @question.user.id == current_user.id && @question.update(update_question_params))
      render 'api/questions/show'
    elsif
      render json: {errors: @form.errors.full_messages}, status: :unprocessable_entity
    end
  end

  private

  def new_question_params
    params.require(:question).permit(:prompt, :description, :required, :form_id)
  end

  def update_question_params
    params.require(:question).permit(:prompt, :description, :required)
  end
end
