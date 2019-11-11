# frozen_string_literal: true

require 'active_support/concern'

module API
  module V1
    module Concerns
      # This module has helper functions with common render patterns
      module CommonRenders
        extend ActiveSupport::Concern

        def render_unauthorized(error = 'Not Authorized')
          render json: { error: error }, status: :unauthorized
        end
      end
    end
  end
end
