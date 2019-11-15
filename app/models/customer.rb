# frozen_string_literal: true

# Customers for whom we have Projects
class Customer < ApplicationRecord
  validates :name, presence: true
  has_many :projects, dependent: :destroy
end
