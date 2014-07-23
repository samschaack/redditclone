class Vote < ActiveRecord::Base
  validates :upordown, :voteable_id, :voteable_type, presence: true
  
  belongs_to :voteable, polymorphic: true
  belongs_to :user
end