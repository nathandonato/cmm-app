# frozen_string_literal: true

class TodoItemSerializer < ActiveModel::Serializer
  attributes :id, :description, :completed_at
end
