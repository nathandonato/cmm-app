# frozen_string_literal: true

require 'test_helper'

class TodoItemTest < ActiveSupport::TestCase
  setup do
    @completed = todo_items(:completed)
    @not_completed = todo_items(:not_completed)
    @user = users(:one)
  end

  test 'can create' do
    assert_difference 'TodoItem.count', 1 do
      TodoItem.create(user: @user, description: 'foobar')
    end
  end

  test 'has attributes' do
    assert_equal 'Take out the trash', @completed.description
    assert_equal Date.new(2019, 11, 11), @completed.completed_at
  end

  test 'completed?' do
    assert @completed.completed?
    assert_not @not_completed.completed?
  end

  test 'must have description' do
    assert_not TodoItem.create(user: @user, description: nil).valid?
  end

  test 'must have user' do
    assert_not TodoItem.create(user: nil, description: 'foobarbaz').valid?
  end
end
