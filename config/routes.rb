Rails.application.routes.draw do
  devise_for :users

  resources :home, only: [:index]

  root to: "home#index"

  match '*path', to: 'home#index', via: :all
end
