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
    
    resources :users, except: [:new, :edit, :show]
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
  get '/api/votes/front_page', to: 'api/votes#front_page'
  get '/api/votes/sub_page', to: 'api/votes#sub_page'
  get '/api/votes/:id', to: 'api/votes#getVote'
  get '/api/users/show_current', to: 'api/users#show_current'
  get '/api/users/get_session', to: 'api/users#get_session'
  get '/api/users/:username', to: 'api/users#show'
end
