# frozen_string_literal: true

# An item in a user's "to do" list. Can be marked as completed.
class TodoItem < ApplicationRecord
  belongs_to :user

  validates :description, presence: true

  def completed?
    completed_at.present?
  end
end
