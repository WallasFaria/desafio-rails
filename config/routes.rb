Rails.application.routes.draw do
  devise_for :users

  resources :home, only: [:index]

  resources :videos, only: [:index, :show, :create, :update, :destroy], defaults: { format: :json }

  root to: "home#index"

  match '*path', to: 'home#index', via: :all
end
