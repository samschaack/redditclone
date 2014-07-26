class RemoveIndexColumn < ActiveRecord::Migration
  def change
    remove_column :posts, :index
  end
end
