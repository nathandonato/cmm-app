# frozen_string_literal: true

# A user with a secure password
class User < ApplicationRecord
  has_secure_password

  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true

  has_many :todo_items, dependent: :destroy
end
