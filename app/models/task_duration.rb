# frozen_string_literal: true

class TaskDuration < ApplicationRecord
  belongs_to :task
  belongs_to :user
end
