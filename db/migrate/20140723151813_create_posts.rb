class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :title, null: false
      t.string :url, default: "n/a"
      t.text :body, default: "n/a"
      t.integer :sub_id, null: false
      t.integer :user_id, null: false
      t.integer :upvotes
      t.integer :downvotes
      
      t.timestamps
    end
    
    add_index :link_posts, :user_id
    add_index :link_posts, :sub_id
  end
end
