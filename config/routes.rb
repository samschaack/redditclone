Rails.application.routes.draw do
  root to: 'pages#root'
  
  namespace :api, defaults: { format: :json } do
    resources :posts, except: [:index, :new, :edit] do
      resources :comments, only: [:index]
    end
    
    resources :comments, except: [:index, :new, :edit] do
      resources :comments, only: [:index]
    end
    
    resources :subs, only: [:create, :index]
    resources :sub_memberships, only: [:create]
    
    resources :votes, only: [:create, :destroy]
    
    resources :users, except: [:new, :edit]
    resource :session, only: [:create, :destroy]
  end
  
  get '/api/subs/:name', to: 'api/subs#get_sub_info'
  get '/api/posts', to: 'api/posts#front_page'
  get '/api/s/:name', to: 'api/posts#sub_page'
  delete '/api/sub_memberships', to: 'api/sub_memberships#destroy'
end
