json.extract! @post, :title, :body, :url, :upvotes, :downvotes, :num_comments, :created_at, :updated_at
json.extract! @sub, :name
json.extract! @user, :username
