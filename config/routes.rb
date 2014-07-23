Rails.application.routes.draw do
  root to: 'pages#root'
  
  namespace :api, defaults: { format: :json } do
    resources :post
  end
end
