# frozen_string_literal: true

class Task < ApplicationRecord
  belongs_to :project

  validates :description, presence: true
end
