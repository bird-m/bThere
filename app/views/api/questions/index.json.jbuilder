@questions.each do |question|
    json.set! question.id do
        json.extract! question, :id, :form_id, :prompt, :description, :required
        json.form_title @title
    end
end
