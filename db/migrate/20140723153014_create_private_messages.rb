class CreatePrivateMessages < ActiveRecord::Migration
  def change
    create_table :private_messages do |t|
      t.integer :sender_id, null: false
      t.integer :receiver_id, null: false
      t.string :subject, default: "No Subject Given"
      t.text :message, null: false
      
      t.timestamps
    end
    
    add_index :private_messages, :sender_id
    add_index :private_messages, :receiver_id
  end
end
