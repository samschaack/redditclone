class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :title, null: false
      t.string :url
      t.text :body
      t.integer :sub_id, null: false
      t.integer :user_id, null: false
      t.integer :upvotes, default: 0
      t.integer :downvotes, default: 0
      
      t.timestamps
    end
    
    add_index :posts, :user_id
    add_index :posts, :sub_id
  end
end
