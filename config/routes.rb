Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  mount Sidekiq::Web => '/sidekiq' if defined?(Sidekiq) && defined?(Sidekiq::Web)
end
