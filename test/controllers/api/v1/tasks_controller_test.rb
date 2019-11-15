# frozen_string_literal: true

require 'test_helper'
require 'helpers/authentication_helper'

module API
  module V1
    class TasksControllerTest < ActionDispatch::IntegrationTest
      setup do
        @project = projects(:one)
        @user = users(:one)
        @headers = jwt_cookie_header(generate_jwt_for(@user))
      end

      test 'index requires authentication' do
        get api_v1_tasks_url, as: :json
        assert_response :unauthorized
      end

      test 'should get index - without filtering' do
        get api_v1_tasks_url, headers: @headers, as: :json
        assert_response :success
      end

      test 'should get index - with filtering' do
        params = { project_id: @project.id }
        get api_v1_tasks_url, headers: @headers, params: params

        assert_response :success
      end
    end
  end
end
