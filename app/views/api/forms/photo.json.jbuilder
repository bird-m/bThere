@forms.each do |form|
    json.set! form.id do
        json.extract! form, :id, :title, :description, :status, :user_id, :custom_url, :restricted
        json.photo_url (form.photo.attached? ? form.photo.url : nil)
    end
end

# json.set! "form" do
#     json.extract! @form, :description
# end

# @teas.each do |tea|
#     json.set! tea.id do
#       # json.id tea.id
#       # json.price tea.price
#       # json.flavor tea.flavor
#       # json.extract! tea, :id, :price, :flavor
#       json.partial! 'tea', tea: tea
#     end
#   end