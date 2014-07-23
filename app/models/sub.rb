class Sub < ActiveRecord::Base
  validates :name, :description, presence: true
  validates :name, uniqueness: true
  
  has_many :posts
  has_many :sub_memberships
  has_many :users, through: :sub_memberships
  
  belongs_to :user, foreign_key: :owner_id
end