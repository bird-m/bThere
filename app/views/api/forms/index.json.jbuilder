@forms.each do |form|
    json.set! form.id do
        json.extract! form, :id, :title, :description, :status, :user_id, :custom_url, :accept_count, :decline_count, :restricted
        # json.photo url_for(form.photo) if form.photo.present?
        json.photo form.photo.url
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

# json.photo_urls post.photo.map {|photo| url_for(photo)}
# json.user_photo url_for(post.author.photo) if post.author.photo.present?