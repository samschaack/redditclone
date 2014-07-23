class Sub < ActiveRecord::Base
  has_many :posts
  has_many :sub_memberships
  has_many :users, through: :sub_memberships
end
