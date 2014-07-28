class Default < ActiveRecord::Base
  validates :sub_id, presence: true
  
  belongs_to(:sub)
end
