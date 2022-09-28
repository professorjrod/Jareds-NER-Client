class DatasetText < ApplicationRecord
  validates :text, presence: true
  has_many :annotations, class_name: 'DatasetTextAnnotation', dependent: :destroy
  belongs_to :dataset
end
