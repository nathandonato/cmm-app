# frozen_string_literal: true

class CreateTaskDurations < ActiveRecord::Migration[6.0]
  def change
    create_table :task_durations do |t|
      t.references :task, null: false, foreign_key: true, index: true
      t.references :user, foreign_key: true
      t.datetime :started_at
      t.datetime :stopped_at
      t.timestamps
    end
  end
end
