# frozen_string_literal: true

class TaskSerializer < ActiveModel::Serializer
  attributes :id, :description
end
