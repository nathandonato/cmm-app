# frozen_string_literal: true

require 'test_helper'
require 'helpers/authentication_helper'

module API
  module V1
    class TodoItemsControllerTest < ActionDispatch::IntegrationTest
      setup do
        @user_one    = users(:one)
        @user_two    = users(:two)
        @headers     = jwt_cookie_header(generate_jwt_for(@user_one))
        @headers_two = jwt_cookie_header(generate_jwt_for(@user_two))
        @todo_item   = todo_items(:not_completed)
      end

      test 'index requires authentication' do
        get api_v1_todo_items_url, as: :json
        assert_response :unauthorized
      end

      test 'should get index' do
        get api_v1_todo_items_url, headers: @headers, as: :json
        assert_response :success
      end

      test 'should show todo_item' do
        get api_v1_todo_item_url(@todo_item), headers: @headers, as: :json
        assert_response :success
      end

      test 'should create todo_item' do
        assert_difference('@user_one.todo_items.count', 1) do
          post api_v1_todo_items_url,
               params: { description: 'foo' },
               headers: @headers,
               as: :json
        end

        assert_response :created
      end

      test 'should update todo_item' do
        patch api_v1_todo_item_url(@todo_item),
              params: { completed_at: Time.now.utc },
              headers: @headers,
              as: :json
        assert_response :ok
        assert @todo_item.reload.completed?
      end

      test 'should destroy todo_item' do
        assert_difference('@user_one.todo_items.count', -1) do
          delete api_v1_todo_item_url(@todo_item), headers: @headers, as: :json
        end

        assert_response :no_content
      end

      test 'show returns not_found' do
        get api_v1_todo_item_url(0), headers: @headers, as: :json
        assert_response :not_found
      end

      test 'update returns not_found' do
        patch api_v1_todo_item_url(0), params: { }, headers: @headers, as: :json
        assert_response :not_found
      end

      test 'delete returns no_content even if not found' do
        delete api_v1_todo_item_url(0), headers: @headers, as: :json
        assert_response :no_content
      end

      test 'create returns errors' do
        assert_difference('@user_one.todo_items.count', 0) do
          post api_v1_todo_items_url,
               params: { description: nil },
               headers: @headers,
               as: :json
        end
        body = JSON.parse(response.body)

        assert_response :unprocessable_entity
        assert_includes body.keys, 'description'
      end

      test 'update returns errors' do
        patch api_v1_todo_item_url(@todo_item),
              params: { description: nil },
              headers: @headers,
              as: :json
        body = JSON.parse(response.body)

        assert_response :unprocessable_entity
        assert_includes body.keys, 'description'
      end

      test "cannot show another user's item" do
        get api_v1_todo_item_url(@todo_item), headers: @headers_two, as: :json
        assert_response :not_found
      end

      test "cannot update another user's item" do
        patch api_v1_todo_item_url(@todo_item),
              params: { completed_at: Time.now.utc },
              headers: @headers_two,
              as: :json
        assert_response :not_found
      end

      test "cannot delete another user's item" do
        assert_difference('@user_one.todo_items.count', 0) do
          delete api_v1_todo_item_url(@todo_item), headers: @headers_two,
                                                   as: :json
        end

        assert_response :no_content
      end
    end
  end
end
