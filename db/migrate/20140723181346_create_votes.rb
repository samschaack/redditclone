class CreateVotes < ActiveRecord::Migration
  def change
    create_table :votes do |t|
      t.integer :upordown, null: false # 1 for up, -1 for down
      t.integer :voteable_id, null: false
      t.string :voteable_type, null: false
      
      t.timestamps
    end
  end
end
