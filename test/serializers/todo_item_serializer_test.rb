# frozen_string_literal: true

require 'test_helper'

class TodoItemSerializerTest < ActiveSupport::TestCase
  setup do
    @completed = todo_items(:completed)
    @not_completed = todo_items(:not_completed)
  end

  test 'serializes todo item' do
    actual = TodoItemSerializer.new(@completed).as_json

    assert_equal @completed.id, actual[:id]
    assert_equal 'Take out the trash', actual[:description]
    assert_equal Date.new(2019, 11, 11), actual[:completed_at]
  end

  test 'serializes todo item with nil completed_at' do
    actual = TodoItemSerializer.new(@not_completed).as_json

    assert_includes actual.keys, :completed_at
    assert_nil actual[:completed_at]
  end
end
