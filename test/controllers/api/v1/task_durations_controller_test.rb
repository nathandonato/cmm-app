# frozen_string_literal: true

require 'test_helper'
require 'helpers/authentication_helper'

module API
  module V1
    class TaskDurationsControllerTest < ActionDispatch::IntegrationTest
      setup do
        @user_one    = users(:one)
        @user_two    = users(:two)
        @headers     = jwt_cookie_header(generate_jwt_for(@user_one))
        @headers_two = jwt_cookie_header(generate_jwt_for(@user_two))
        @task        = tasks(:two)
        @task_duration = task_durations(:ongoing)
      end

      test 'index requires authentication' do
        get api_v1_task_durations_url, as: :json
        assert_response :unauthorized
      end

      test 'should get index - without filtering' do
        get api_v1_task_durations_url, headers: @headers, as: :json
        body = JSON.parse(response.body)

        assert_response :success
        assert_equal 3, body.count
      end

      test 'should get index - with filtering' do
        params = { task_id: @task.id }
        get api_v1_task_durations_url, headers: @headers, params: params
        body = JSON.parse(response.body)

        assert_response :success
        assert_equal 1, body.count
      end

      test 'should show task_duration' do
        get api_v1_task_duration_url(@task_duration),
            headers: @headers,
            as: :json
        assert_response :success
      end

      test 'should create task_duration' do
        assert_difference('@user_one.task_durations.count', 1) do
          post api_v1_task_durations_url,
               params: duration_params(task_id: @task.id),
               headers: @headers,
               as: :json
        end
        assert_response :created
      end

      # TODO: Figure out how to assert this without a delta
      test 'should update task_duration' do
        expected_stop = DateTime.now.utc
        patch api_v1_task_duration_url(@task_duration),
              params: duration_params(stopped_at: expected_stop),
              headers: @headers,
              as: :json
        assert_response :ok

        actual_stop = @task_duration.reload.stopped_at
        assert_in_delta expected_stop, actual_stop, 0.001
      end

      test 'should destroy task_duration' do
        assert_difference('@user_one.task_durations.count', -1) do
          delete api_v1_task_duration_url(@task_duration),
                 headers: @headers,
                 as: :json
        end

        assert_response :no_content
      end

      test 'show returns not_found' do
        get api_v1_task_duration_url(0), headers: @headers, as: :json
        assert_response :not_found
      end

      test 'update returns not_found' do
        patch api_v1_task_duration_url(0),
              params: duration_params(task_id: @task.id),
              headers: @headers,
              as: :json
        assert_response :not_found
      end

      test 'delete returns not_found' do
        delete api_v1_task_duration_url(0), headers: @headers, as: :json
        assert_response :not_found
      end

      test 'create returns errors' do
        assert_difference('@user_one.task_durations.count', 0) do
          post api_v1_task_durations_url,
               params: duration_params(task_id: nil),
               headers: @headers,
               as: :json
        end
        body = JSON.parse(response.body)

        assert_response :unprocessable_entity
        assert_includes body.keys, 'task'
      end

      test 'update returns errors' do
        patch api_v1_task_duration_url(@task_duration),
              params: duration_params(task_id: nil),
              headers: @headers,
              as: :json
        body = JSON.parse(response.body)

        assert_response :unprocessable_entity
        assert_includes body.keys, 'task'
      end

      test "cannot show another user's item" do
        get api_v1_task_duration_url(@task_duration),
            headers: @headers_two,
            as: :json
        assert_response :not_found
      end

      test "cannot update another user's item" do
        patch api_v1_task_duration_url(@task_duration),
              params: duration_params(stopped_at: Time.now.utc),
              headers: @headers_two,
              as: :json
        assert_response :not_found
      end

      test "cannot delete another user's item" do
        assert_difference('@user_one.task_durations.count', 0) do
          delete api_v1_task_duration_url(@task_duration),
                 headers: @headers_two,
                 as: :json
        end

        assert_response :not_found
      end

      private

      def duration_params(params)
        { task_duration: params }
      end
    end
  end
end
