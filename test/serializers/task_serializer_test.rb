# frozen_string_literal: true

require 'test_helper'

class TaskSerializerTest < ActiveSupport::TestCase
  setup do
    @task = tasks(:one)
  end

  test 'serializes task' do
    actual = TaskSerializer.new(@task).as_json

    assert_equal @task.id, actual[:id]
    assert_equal @task.description, actual[:description]
  end
end
