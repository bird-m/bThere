json.extract! @form, :id, :title, :description, :status, :custom_url, :restricted
json.photo @form.photo.url