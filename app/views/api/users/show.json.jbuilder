json.set! "user" do
    json.extract! @user, :id, :email, :phone, :created_at, :updated_at
end