class ChangeTitleFormatInPostTableTryAgain < ActiveRecord::Migration
  def change
    change_column :posts, :title, :text, limit: nil
  end
end