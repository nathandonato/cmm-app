# frozen_string_literal: true

class Task < ApplicationRecord
  belongs_to :project
  has_many :task_durations, dependent: :destroy

  validates :description, presence: true
end
