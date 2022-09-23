class DatasetSerializer < ActiveModel::Serializer
  attributes :id, :title
  has_many :texts, class_name: 'DatasetText'
end
