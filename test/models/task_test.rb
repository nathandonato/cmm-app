# frozen_string_literal: true

require 'test_helper'

class TaskTest < ActiveSupport::TestCase
  setup do
    @task = tasks(:one)
    @project = projects(:one)
  end

  test 'can create' do
    assert Task.new(project: @project, description: 'foo').valid?
  end

  test 'has attributes' do
    assert_equal 'Mock up logo', @task.description
    assert_equal @project, @task.project
  end

  test 'requires description' do
    refute Task.new(project: @project).valid?
  end

  test 'requires project' do
    refute Task.new(description: 'Foobar').valid?
  end
end
