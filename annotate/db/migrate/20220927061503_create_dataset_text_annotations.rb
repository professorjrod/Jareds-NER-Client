class CreateDatasetTextAnnotations < ActiveRecord::Migration[7.0]
  def change
    create_table :dataset_text_annotations do |t|
      t.belongs_to :dataset_text, null: false, foreign_key: true
      t.integer :selection_start, null: false
      t.integer :selection_end, null: false
      t.string :tag, null: false
      t.text :text, null: false
      t.timestamps
    end
  end
end
