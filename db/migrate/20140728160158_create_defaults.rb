class CreateDefaults < ActiveRecord::Migration
  def change
    create_table :defaults do |t|
      t.integer :sub_id, null: false
      
      t.timestamps
    end
  end
end
