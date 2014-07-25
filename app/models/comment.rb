class Comment < ActiveRecord::Base
  validates :user_id, :commentable_id, :commentable_type, :body, presence: true
  
  belongs_to :commentable, polymorphic: true
  
  has_many :votes, as: :voteable
  has_many :comments, as: :commentable
  
  belongs_to :user
end