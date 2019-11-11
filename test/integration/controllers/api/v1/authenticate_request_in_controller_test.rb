# frozen_string_literal: true

require 'test_helper'
require 'helpers/authentication_helper'
require 'jwt_manager'

module API
  module V1
    class FakeController < APIController
      include Concerns::AuthenticateRequest

      def index
        render nothing: true
      end
    end

    # Note this test's name mismatches the file name. This is necessary for
    # Rails' magic to find our controller class
    class FakeControllerTest < ActionDispatch::IntegrationTest
      setup do
        Rails.application.routes.draw do
          get 'fake' => 'api/v1/fake#index'
        end
        @user = users(:one)
        @jwt = JwtManager.encode(user_id: @user.id)
      end

      teardown do
        Rails.application.reload_routes!
      end

      test 'autheticates user' do
        get '/fake', headers: jwt_cookie_header(@jwt)

        assert_response :success
      end

      test 'renders unauthorized if no jwt provided' do
        get '/fake'
        assert_response :unauthorized
      end

      test 'renders unauthorized if bad token' do
        jwt = JwtManager.encode(user_id: 0)
        get '/fake', headers: jwt_cookie_header(jwt)
        assert_response :unauthorized
      end

      test 'renders unauthorized if expired token' do
        jwt = JwtManager.encode(user_id: @user.id, exp: 1.week.ago.to_i)
        get '/fake', headers: jwt_cookie_header(jwt)
        assert_response :unauthorized
      end
    end
  end
end
