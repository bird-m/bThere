class Api::ContactsController < ApplicationController
  def create
    if(!logged_in?)
      render json: { errors: ['Only logged in users may access this type of data'] }, status: :unauthorized
      return
    end

    @contact = Contact.new(contact_params)
    @contact.user_id = current_user.id
    @contact.email = params[:contact][:email].downcase

    # initializing these two, may override later
    @form_id = params[:form_id]
    @form = nil
    @invite_id = nil

    if(@form_id)
      @form = Form.find_by(id: params[:form_id])

      if(!@form || @form.user_id != current_user.id)
        render json: {errors: ["form not found or form does not belong to user"]}, status: :unprocessable_entity
      end
    end

    # need this in order to share the same show view, which always expects these variables

    if(!@contact.save)
      render json: {errors: @contact.errors.full_messages}, status: :unprocessable_entity      
    end

    if(@form)
      invite = Invite.create(contact_id: @contact.id, form_id: @form_id)
      @invite_id = invite.id
    end
    
    render 'api/contacts/show'
  end

  def index

    if(!logged_in?)
      render json: { errors: ['Only logged in users may access this type of data'] }, status: :unauthorized
      return
    end

    form = nil
    query = nil

    get_invitation = false

    form_id = params[:form_id]

    if(form != "null")
      form = Form.find_by(id: form_id)
    end

    if(form)
      if (form.user_id == current_user.id)
        get_invitation = true;

        query = <<-SQL
        select
        c.*,
        i.form_id,
        coalesce(i.id, -1) as invite_id
        from contacts as c
        left join invites as i on i.contact_id = c.id
        where i.form_id = ? OR i.form_id IS null
        and c.user_id = ?
        SQL

        @contacts = Contact.find_by_sql([query, form_id, current_user.id])
      else
        render json: { errors: ['Not authorized'] }, status: :unauthorized
        return
      end
    else
      query = <<-SQL
        select
        c.*,
        case when true then null end as form_id,
        case when true then null end as invite_id
        from contacts as c
        where c.user_id = ?
      SQL

      @contacts = Contact.find_by_sql([query, current_user.id])
    end


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
    contact = nil;
    
    if(@form)
      contact = @form.invited_contacts.find_by(email: params[:email].downcase)
      # debugger
    end
      # debugger
      render json: contact
  end

  private
  def contact_params
    params.require(:contact).permit(:email, :name);
  end
end
