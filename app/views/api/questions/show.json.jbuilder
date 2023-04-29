json.extract! @question, :id, :prompt, :description, :required, :form_id
json.user_id @question.user.id