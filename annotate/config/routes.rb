# config/routes.rb
Rails.application.routes.draw do
  post '/demo', to: 'spacy#demo'
  get 'dataset_text_annotations/post'
  get 'datasets/index', to: 'datasets#index'
  get 'datasets/:id', to: 'datasets#show'
  get 'texts/:id', to: 'dataset_texts#show'
  post 'texts/:id/annotation', to: 'dataset_text_annotations#post'
end
