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
    
    resources :votes, only: [:create, :index]
    
    resources :users, except: [:new, :edit]
    resource :session, only: [:create, :destroy]
  end
  
  get '/api/posts', to: 'api/posts#front_page'
  get '/api/s/:name', to: 'api/posts#sub_page'
  delete '/api/sub_memberships', to: 'api/sub_memberships#destroy'
  get '/api/current', to: 'api/users#current'
  get '/api/subs/subscribed', to: 'api/subs#subscribed'
  get '/api/subs/unsubscribed', to: 'api/subs#unsubscribed'
  get '/api/subs/owned', to: 'api/subs#owned'
  get '/api/subs/:name', to: 'api/subs#get_sub_info'
  delete '/api/votes', to: 'api/votes#destroy'
  get '/api/votes/:id', to: 'api/votes#getVote'
end
