json.array! @posts do |post|
  json.user post.user.username
  json.points post.user.points
  json.sub post.sub.name
  json.extract! post, :id, :title, :body, :url, :user_id, :sub_id, :upvotes, :downvotes, :num_comments, :created_at, :updated_at
end