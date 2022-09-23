# config/routes.rb
Rails.application.routes.draw do
  get 'datasets/index', to: 'datasets#index'
  get 'datasets/:id', to: 'datasets#show'

  # route to test your configuration
  get '/hello', to: 'application#hello_world'
end
