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

ActiveRecord::Schema[7.0].define(version: 2023_05_01_211903) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "forms", force: :cascade do |t|
    t.string "title", null: false
    t.string "description"
    t.string "status", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "custom_url", null: false
    t.index ["custom_url"], name: "index_forms_on_custom_url", unique: true
    t.index ["user_id", "title"], name: "index_forms_on_user_id_and_title", unique: true
    t.index ["user_id"], name: "index_forms_on_user_id"
  end

  create_table "questions", force: :cascade do |t|
    t.string "prompt", null: false
    t.string "description"
    t.boolean "required", default: false, null: false
    t.bigint "form_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["form_id", "prompt"], name: "index_questions_on_form_id_and_prompt", unique: true
    t.index ["form_id"], name: "index_questions_on_form_id"
  end

  create_table "responses", force: :cascade do |t|
    t.text "answer", null: false
    t.bigint "question_id", null: false
    t.bigint "submission_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["question_id"], name: "index_responses_on_question_id"
    t.index ["submission_id"], name: "index_responses_on_submission_id"
  end

  create_table "submissions", force: :cascade do |t|
    t.bigint "form_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["form_id"], name: "index_submissions_on_form_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
  end

  add_foreign_key "forms", "users"
  add_foreign_key "questions", "forms"
  add_foreign_key "responses", "questions"
  add_foreign_key "responses", "submissions"
  add_foreign_key "submissions", "forms"
end
