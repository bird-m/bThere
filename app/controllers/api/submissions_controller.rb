class Api::SubmissionsController < ApplicationController

    def create
        
        submission = Submission.create(form_id: params[:submission][:form_id])
        
        responses = params[:submission][:responses]

        response_objects = responses.map { |r| { answer: r[:answer], question_id: r[:question_id], submission_id: submission.id } }
        
        Response.create(response_objects)
    end

    # def submission_params
    #     params.require(:submission).permit(:form_id, responses: [])
    # end

    def index
        @form = Form.includes(submissions: :responses).find_by(id: params[:form_id])
        render 'api/submissions/index'
    end
end
