class AddIsAnnotatedToDatasetTexts < ActiveRecord::Migration[7.0]
  def change
    add_column :dataset_texts, :is_annotated, :boolean, default: false
  end
end
