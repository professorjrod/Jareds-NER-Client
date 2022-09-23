# config/routes.rb
Rails.application.routes.draw do
  get 'datasets/show'
  get 'datasets/index'

  # route to test your configuration
  get '/hello', to: 'application#hello_world'
end
