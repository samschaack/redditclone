class Vote < ActiveRecord::Base
  validates :upordown, :voteable_id, :voteable_type, :user_id, presence: true
  
  belongs_to :voteable, polymorphic: true
  belongs_to :user
end