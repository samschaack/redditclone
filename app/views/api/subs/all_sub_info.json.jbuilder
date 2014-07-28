json.array! @subs do |sub|
  json.extract! sub, :id, :name, :description, :created_at, :updated_at, :num_users, :num_posts
end 