class Comment < ActiveRecord::Base
  belongs_to :commentable, polymorphic: true
  
  has_many :votes, as: :voteable
  has_many :comments, as: :commentable
  
  belongs_to :post
  belongs_to :user
end
