Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api, defaults: {format: :json} do
    resources :users, only: :create
    resource :session, only: [:show, :create, :destroy]
    resources :forms, only: [:index, :create, :destroy, :update, :show] do
      resources :questions, only: [:create]
    end

    resources :invites, only: [:destroy]

    # get '/forms/:custom_url', to: 'forms#show'
    post '/forms/:form_id/:contact_id', to: 'invites#create'
    get '/:form_id/questions', to: 'questions#index'
    
    get '/questions/:id', to: 'questions#show'
    delete '/questions/:id', to: 'questions#destroy'
    post '/questions', to: 'questions#create'
    patch '/questions/:id', to: 'questions#update'
    post '/submissions', to: 'submissions#create'

    get '/:form_id/submissions', to: 'submissions#index'
    get '/photos', to: 'forms#test'
    # get '/contacts', to: 'contacts#index'
    get '/contacts/:form_id', to: 'contacts#index'
    delete '/contacts/:id', to: 'contacts#destroy'
    post '/contacts', to: 'contacts#create'
    post '/check/:form_id/:ignore', to: 'contacts#check'

    post '/otps/send', to: 'otps#send_otp'
    # post '/otps/verify', to: 'otps#verify_otp'
  end

  # post 'api/test', to: 'application#test'

  get '*path', to: "static_pages#frontend_index"
end


