class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username, null: false
      t.string :email, default: "None"
      t.string :password_digest, null: false
      t.string :token, null: false
      t.integer :points, default: 0
      
      t.timestamps
    end
    
    add_index :users, :username, unique: true
  end
end
