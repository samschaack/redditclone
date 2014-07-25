json.array! @comments do |comment|
  json.user comment.user.username
  json.extract! comment, :id, :body, :indents, :upvotes, :downvotes, :created_at, :updated_at
end