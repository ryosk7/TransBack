Rails.application.routes.draw do
  resource :redis, only: [] do
    # redis working checker
    get "/session_set", to: "redis#session_set"
    get "/session_get", to: "redis#session_get"
  end

  defaults format: :json do
    resources :coupons
    resources :organizations
    resources :users
    resources :user_coupons
    get "/current_user_set", to: "session#current_user_set"
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
