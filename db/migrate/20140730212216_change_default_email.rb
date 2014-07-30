class ChangeDefaultEmail < ActiveRecord::Migration
  def change
    change_column :users, :email, :string, default: "none"
  end
end
