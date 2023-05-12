@contacts.each do |contact|
    json.set! contact.id do
        json.extract! contact, :id, :email
    end
end