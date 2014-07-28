class Sub < ActiveRecord::Base
  validates :name, :description, presence: true
  validates :name, uniqueness: true
  
  has_many :posts, dependent: :destroy
  has_many :sub_memberships, dependent: :destroy
  has_many :users, through: :sub_memberships
  has_many :defaults
  
  belongs_to :user, foreign_key: :owner_id
  
  def num_users
    self.users.length
  end
  
  def num_posts
    self.posts.length
  end
end