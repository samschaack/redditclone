class AddIndentsColumnToComments < ActiveRecord::Migration
  def change
    add_column :comments, :indents, :integer, default: 0
  end
end
