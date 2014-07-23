class CreateSubs < ActiveRecord::Migration
  def change
    create_table :subs do |t|
      t.string :name, null: false
      t.text :description, null: false
      t.integer :owner_id, default: "Public"
      
      t.timestamps
    end
    
    add_index :subs, :name, unique: true
  end
end
