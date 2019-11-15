# frozen_string_literal: true

# Durations of time an employee (user) spent on a task
# It has #started_at and #stopped_at attributes
class TaskDuration < ApplicationRecord
  belongs_to :task
  belongs_to :user
end
