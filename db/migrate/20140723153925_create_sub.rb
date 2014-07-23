class CreateSubs < ActiveRecord::Migration
  def change
    create_table :subs do |t|
      t.string :name, null: false
      t.string :description, null: false # (?)
      
      t.timestamps
    end
  end
end
