class DatasetTextAnnotation < ApplicationRecord
  validates :selection_start, presence: true
  validates :selection_end, presence: true
  validates :tag, presence: true
  validates :text, presence: true

  belongs_to :dataset_text
end
