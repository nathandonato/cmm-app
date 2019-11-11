# frozen_string_literal: true

require 'jwt_manager'
require 'memoist'

module API
  module V1
    module Concerns
      # This module allows a controller to authenticate users via JWTs sent
      # in a request's cookies
      module AuthenticateRequest
        include CommonRenders
        extend ActiveSupport::Concern
        extend Memoist

        included do
          before_action :authenticate_request!
        end

        def authenticate_request!
          render_unauthorized unless current_user.present?
        end

        memoize def current_user
          return unless jwt_payload.present?

          user_id = jwt_payload.first['user_id']
          User.find_by_id(user_id)
        end

        private

        # Attempt to decode the JWT; return nil if missing, invalid, or expired
        memoize def jwt_payload
          return if jwt.blank?

          begin
            JwtManager.decode(jwt)
          rescue JWT::VerificationError, JWT::DecodeError
            return
          end
        end

        memoize def jwt
          request&.cookies&.[]('cmm_jwt')
        end
      end
    end
  end
end
