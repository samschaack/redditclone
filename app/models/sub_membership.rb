class SubMembership < ActiveRecord::Base
  belongs_to :sub
  belongs_to :user
end