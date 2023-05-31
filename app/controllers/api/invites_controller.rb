class Api::InvitesController < ApplicationController
    def create
        if(!logged_in?)
            render json: { errors: ['Only logged in users may access this type of data'] }, status: :unauthorized
            return
        end

        contact_id = params[:contact_id]
        @form_id = params[:form_id]

        form = Form.find_by(id: @form_id)
        @contact = Contact.find_by(id: contact_id)

        if(!form || !@contact)
            render json: { errors: ['Form or Contact not found'] }, status: :not_found
            return
        elsif ((form.user_id != current_user.id) || (@contact.user_id != current_user.id))
            render json: { errors: ['Not authorized to view this data'] }, status: :unauthorized
            return
        end

        @invite = Invite.new(contact_id: contact_id, form_id: @form_id)

        if(@invite.save)
            render 'api/contacts/show'
        else
            render json: { errors: @invite.errors.full_messages }, status: :unprocessable_entity
            return
        end
    end

    def destroy
        if(!logged_in?)
            render json: { errors: ['Only logged in users may access this type of data'] }, status: :unauthorized
            return
        end

        invite = Invite.includes(:contact).find_by(id: params[:id])
        @contact = invite.contact
        
        if(invite && (@contact.user_id == current_user.id) && invite.destroy)
            @form_id = nil
            @invite_id = nil
            render 'api/contacts/show'
        else
            render json: { errors: @invite.errors.full_messages }, status: :unprocessable_entity
        end
    end
end