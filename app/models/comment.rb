class Comment < ActiveRecord::Base
  validates :user_id, :commentable_id, :commentable_type, :body, presence: true
  
  belongs_to :commentable, polymorphic: true
  
  has_many :votes, as: :voteable
  has_many :comments, as: :commentable, dependent: :destroy
  
  belongs_to :user
  
  before_destroy :decrement_post_comments_count
  
  private 
  
  def decrement_post_comments_count
    @post = Post.find(self.post_id)
    @post.update({ num_comments: @post.num_comments - 1 })
  end
end