# frozen_string_literal: true

class TaskDurationSerializer < ActiveModel::Serializer
  attributes :id, :started_at, :stopped_at
end
