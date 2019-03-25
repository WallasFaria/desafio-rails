Rails.application.routes.draw do
  devise_for :users

  resources :home, only: [:index]

  resources :videos, only: %i(index show create update destroy), defaults: { format: :json } do
    resources :views, only: [:create]
  end

  root to: "home#index"

  match '*path', to: 'home#index', via: :all
end
