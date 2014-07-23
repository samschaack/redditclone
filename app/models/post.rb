class Post < ActiveRecord::Base
  validates :title, :sub_id, :user_id, presence: true
  validates_presence_of :url, unless: :body
  validates_presence_of :body, unless: :url
  
  has_many :votes, as: :voteable
  has_many :comments, as: :commentable
  
  belongs_to :user
  belongs_to :sub
end