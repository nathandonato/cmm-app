# frozen_string_literal: true

class Customer < ApplicationRecord
  validates :name, presence: true
  has_many :projects, dependent: :destroy
end
