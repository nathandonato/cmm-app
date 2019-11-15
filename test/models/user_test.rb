# frozen_string_literal: true

require 'test_helper'

class UserTest < ActiveSupport::TestCase
  setup do
    @user = users(:one)
  end

  test 'has attributes' do
    assert_equal 'User', @user.username
    assert_equal 'user@foo.bar', @user.email
  end

  test 'has secure password' do
    user = User.new(username: 'foo', email: 'bar', password: 'password')
    user.save
    user.reload

    assert_not_nil user.password_digest
  end

  test 'todo items are destroyed with user' do
    assert_difference 'TodoItem.count', -2 do
      @user.destroy
    end
  end

  test 'task durations are NOT destroyed with user' do
    assert_difference 'TaskDuration.count', 0 do
      @user.destroy
    end
  end
end
