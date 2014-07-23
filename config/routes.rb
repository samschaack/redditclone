Rails.application.routes.draw do
  root to: 'pages#root'
  
  namespace :api, defaults: { format: :json } do
    resources :posts, except: [:index]
  end
  
  get '/api/posts', to: 'api/posts#front_page'
end
