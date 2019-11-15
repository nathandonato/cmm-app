# frozen_string_literal: true

# A task is a unit of work on a given a Project
class Task < ApplicationRecord
  belongs_to :project
  has_many :task_durations, dependent: :destroy

  validates :description, presence: true
end
