# config/routes.rb
Rails.application.routes.draw do
  get 'datasets/index', to: 'dataset#index'
  get 'datasets/:id', to: 'dataset#show'
  get 'texts/:id', to: 'dataset_texts#show'
  # route to test your configuration
  get '/hello', to: 'application#hello_world'
end
