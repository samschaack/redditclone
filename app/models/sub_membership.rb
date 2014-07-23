class SubMembership < ActiveRecord::Base
  validates :user_id, :sub_id, presence: true
  
  belongs_to :sub
  belongs_to :user
end