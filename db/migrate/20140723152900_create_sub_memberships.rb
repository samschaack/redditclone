class CreateSubMemberships < ActiveRecord::Migration
  def change
    create_table :sub_memberships do |t|
      t.integer :user_id, null: false
      t.integer :sub_id, null: false
      
      t.timestamps
    end
  end
end
