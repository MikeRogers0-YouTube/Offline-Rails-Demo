Rails.application.routes.draw do
  resources :posts
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  root to: redirect('/posts')

  mount Sidekiq::Web => '/sidekiq' if defined?(Sidekiq) && defined?(Sidekiq::Web)
end
