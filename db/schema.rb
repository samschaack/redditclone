# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140725173230) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: true do |t|
    t.integer  "user_id",                      null: false
    t.integer  "commentable_id",               null: false
    t.string   "commentable_type",             null: false
    t.text     "body",                         null: false
    t.integer  "upvotes",          default: 0
    t.integer  "downvotes",        default: 0
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "comments", ["user_id"], name: "index_comments_on_user_id", using: :btree

  create_table "posts", force: true do |t|
    t.text     "title",                  null: false
    t.string   "url"
    t.text     "body"
    t.integer  "sub_id",                 null: false
    t.integer  "user_id",                null: false
    t.integer  "upvotes",    default: 0
    t.integer  "downvotes",  default: 0
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "posts", ["sub_id"], name: "index_posts_on_sub_id", using: :btree
  add_index "posts", ["user_id"], name: "index_posts_on_user_id", using: :btree

  create_table "private_messages", force: true do |t|
    t.integer  "sender_id",                                null: false
    t.integer  "receiver_id",                              null: false
    t.string   "subject",     default: "No Subject Given"
    t.text     "message",                                  null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "private_messages", ["receiver_id"], name: "index_private_messages_on_receiver_id", using: :btree
  add_index "private_messages", ["sender_id"], name: "index_private_messages_on_sender_id", using: :btree

  create_table "sub_memberships", force: true do |t|
    t.integer  "user_id",    null: false
    t.integer  "sub_id",     null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "subs", force: true do |t|
    t.string   "name",                    null: false
    t.text     "description",             null: false
    t.integer  "owner_id",    default: 0
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "subs", ["name"], name: "index_subs_on_name", unique: true, using: :btree

  create_table "users", force: true do |t|
    t.string   "username",                         null: false
    t.string   "email",           default: "None"
    t.string   "password_digest",                  null: false
    t.string   "token",                            null: false
    t.integer  "points",          default: 0
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

  create_table "votes", force: true do |t|
    t.integer  "upordown",      null: false
    t.integer  "voteable_id",   null: false
    t.string   "voteable_type", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
