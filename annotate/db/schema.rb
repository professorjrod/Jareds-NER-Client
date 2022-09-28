# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_09_28_085719) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "dataset_text_annotations", force: :cascade do |t|
    t.bigint "dataset_text_id", null: false
    t.integer "selection_start", null: false
    t.integer "selection_end", null: false
    t.string "tag", null: false
    t.text "text", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["dataset_text_id"], name: "index_dataset_text_annotations_on_dataset_text_id"
  end

  create_table "dataset_texts", force: :cascade do |t|
    t.bigint "dataset_id", null: false
    t.text "text", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "is_annotated", default: false
    t.index ["dataset_id"], name: "index_dataset_texts_on_dataset_id"
  end

  create_table "datasets", force: :cascade do |t|
    t.string "title", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "dataset_text_annotations", "dataset_texts"
  add_foreign_key "dataset_texts", "datasets"
end
