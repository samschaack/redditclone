class AddNumCommentsColumnToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :num_comments, :integer, default: 0
  end
end
