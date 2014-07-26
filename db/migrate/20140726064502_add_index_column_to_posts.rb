class AddIndexColumnToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :index, :integer, default: 0
  end
end
