# config/routes.rb
Rails.application.routes.draw do
  get 'datasets/index', to: 'datasets#index'
  get 'datasets/:id', to: 'datasets#show'
  get 'texts/:id', to: 'dataset_texts#show'
end
