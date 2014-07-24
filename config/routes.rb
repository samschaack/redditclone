Rails.application.routes.draw do
  root to: 'pages#root'
  
  namespace :api, defaults: { format: :json } do
    resources :posts, except: [:index]
    resources :users
  end
  
  get '/api/posts', to: 'api/posts#front_page'
  get '/api/posts/:name', to: 'api/posts#sub_page'
end
