class CreateVotes < ActiveRecord::Migration
  def change
    create_table :votes do |t|
      t.integer :upordown, null: false
      t.integer :voteable_id, null: false
      t.string :voteable_type, null: false
      
      t.timestamps
    end
  end
end
