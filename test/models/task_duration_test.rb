# frozen_string_literal: true

require 'test_helper'

class TaskDurationTest < ActiveSupport::TestCase
  setup do
    @duration = task_durations(:ongoing)
    @task = tasks(:one)
    @user = users(:one)
  end

  test 'can create' do
    duration = TaskDuration.new(
      task: @task, user: @user, started_at: DateTime.now.utc
    )
    assert duration.valid?
  end

  test 'has attributes' do
    expected_start = Date.new(2019, 11, 15)
    expected_stop = Date.new(2019, 11, 15) + 1.hour
    assert_equal @task, @duration.task
    assert_equal @user, @duration.user
    assert_equal expected_start, @duration.started_at
    assert_equal expected_stop, @duration.stopped_at
  end

  test 'requires task' do
    refute TaskDuration.new(user: @user).valid?
  end

  test 'requires user' do
    refute TaskDuration.new(task: @task).valid?
  end
end
