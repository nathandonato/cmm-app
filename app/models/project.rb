# frozen_string_literal: true

class Project < ApplicationRecord
  belongs_to :customer
  has_many :tasks, dependent: :destroy

  validates :description, presence: true
end
