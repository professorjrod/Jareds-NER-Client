# config/routes.rb
Rails.application.routes.draw do
  root to: 'application#spa'
  # route to test your configuration
  get '/hello', to: 'application#hello_world'

  get '/*path', to: 'application#spa'
end
