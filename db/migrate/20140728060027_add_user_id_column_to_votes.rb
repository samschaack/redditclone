class AddUserIdColumnToVotes < ActiveRecord::Migration
  def change
    add_column :votes, :user_id, :integer, null: false
  end
end
