# frozen_string_literal: true

# Projects we have for customers. Broken down into Tasks
class Project < ApplicationRecord
  belongs_to :customer
  has_many :tasks, dependent: :destroy

  validates :description, presence: true
end
