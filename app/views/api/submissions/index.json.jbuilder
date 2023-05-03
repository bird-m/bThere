json.submissions do
    @form.submissions.each do |sub|
        json.set! sub.id do
            json.extract! sub, :id, :form_id, :created_at, :name, :email, :status
        end
    end
end

json.responses do
    @form.responses.each do |res|
        json.set! res.id do
            json.extract! res, :answer, :id, :submission_id, :created_at, :question_id
        end        
    end
end

# json.responses do
#     json.array!(@form.responses) do |res|
#         json.set! res.id do
#             json.extract! res, :id, :answer
#         end
#     end
# end

# responses = []

# @submissions.each do |sub|
#     responses += sub.responses
# end

# responses.each do |r|
#     print r
#     puts
# end

# # json.responses

# # json.responses do