class Api::SubmissionsController < ApplicationController

    def create
        # debugger
        submission = Submission.create(submission_params)
        
        responses = params[:submission][:responses]

        response_objects = responses.map { |r| { answer: r[:answer], question_id: r[:question_id], submission_id: submission.id } }
        
        Response.create(response_objects)

        # puts "I am here"
    end

    # def submission_params
    #     params.require(:submission).permit(:form_id, responses: [])
    # end

    def index
        @form = Form.includes(submissions: :responses).find_by(id: params[:form_id])
        render 'api/submissions/index'
    end

    private

    def submission_params
        params.require(:submission).permit(:form_id, :name, :email, :status)
    end
end
