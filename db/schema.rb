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

ActiveRecord::Schema[7.0].define(version: 2023_08_22_231714) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "contacts", force: :cascade do |t|
    t.string "email", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name", null: false
    t.index ["email"], name: "index_contacts_on_email", unique: true
    t.index ["user_id"], name: "index_contacts_on_user_id"
  end

  create_table "forms", force: :cascade do |t|
    t.string "title", null: false
    t.string "description"
    t.string "status", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "custom_url"
    t.boolean "restricted", default: false
    t.index ["user_id", "title"], name: "index_forms_on_user_id_and_title", unique: true
    t.index ["user_id"], name: "index_forms_on_user_id"
  end

  create_table "invites", force: :cascade do |t|
    t.bigint "contact_id", null: false
    t.bigint "form_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["contact_id"], name: "index_invites_on_contact_id"
    t.index ["form_id", "contact_id"], name: "index_invites_on_form_id_and_contact_id", unique: true
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
    t.string "status", default: "maybe", null: false
    t.string "name", default: "Doe", null: false
    t.string "email", default: "doe@unknown.com", null: false
    t.index ["form_id"], name: "index_submissions_on_form_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "phone"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["phone"], name: "index_users_on_phone", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "contacts", "users"
  add_foreign_key "forms", "users"
  add_foreign_key "invites", "contacts"
  add_foreign_key "invites", "forms"
  add_foreign_key "questions", "forms"
  add_foreign_key "responses", "questions"
  add_foreign_key "responses", "submissions"
  add_foreign_key "submissions", "forms"
end
