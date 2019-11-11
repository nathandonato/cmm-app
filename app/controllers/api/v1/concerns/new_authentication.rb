# frozen_string_literal: true

require 'active_support/concern'
require 'jwt_manager'

module API
  module V1
    module Concerns
      # Including this module allows a controller to create JWT cookies for
      # users
      module NewAuthentication
        extend ActiveSupport::Concern

        VALID_TOKEN_DURATION = 1.week

        # This 1) sets the JWT cookie and 2) renders the user object
        def render_authentication_payload(user)
          cookies[:cmm_jwt] = create_jwt_cookie(user.id)
          render json: { user: UserSerializer.new(user) }, status: :ok
        end

        def create_jwt_cookie(user_id)
          expiration_date = VALID_TOKEN_DURATION.from_now
          jwt = JwtManager.encode(user_id: user_id, exp: expiration_date.to_i)

          { value: jwt, httponly: true, expires: expiration_date }
        end
      end
    end
  end
end
