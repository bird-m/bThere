class Api::ContactsController < ApplicationController
  def create
    if(!logged_in?)
      render json: { errors: ['Only logged in users may access this type of data'] }, status: :unauthorized
      return
    end

    @contact = Contact.new(contact_params)
    @contact.user_id = current_user.id

    if(@contact.save)
      render 'api/contacts/show'
    else
      render json: {errors: @contact.errors.full_messages}, status: :unprocessable_entity
    end

  end

  def index
    if(!logged_in?)
      render json: { errors: ['Only logged in users may access this type of data'] }, status: :unauthorized
      return
    end

    @contacts = current_user.contacts

    render '/api/contacts/index'
  end

  def destroy
    if(!logged_in?)
      render json: { errors: ['Only logged in users may access this type of data'] }, status: :unauthorized
      return
    end

    @contact = Contact.find_by(id: params[:id])

    if(!@contact)
      render json: { errors: ['Invalid contact ID'] }, status: :not_found
    end
    if (@contact.user != current_user)
      render json: { errors: ['You do not have priveleges to delete'] }, status: :unauthorized
    end

    if(@contact.destroy)
      head :no_content
    else
      render json: { errors: ['Deletion error'] }, status: :unprocessable_entity
    end
  end

  def check
    puts "I AM HERE"
    
    @form = Form.find_by(id: params[:form_id])
    
    if(@form)
      @contacts = @form.user.contacts.pluck(:email).map(&:downcase)
      # debugger
      render json: @contacts.include?(params[:email].downcase)
      
    else
      # debugger
      render json: false
    end
  end

  private
  def contact_params
    params.require(:contact).permit(:email);
  end
end
