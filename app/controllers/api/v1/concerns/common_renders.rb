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

        def render_not_found
          render json: { error: 'Not found' }, status: :not_found
        end

        def render_record_errors(record)
          render json: record.errors, status: :unprocessable_entity
        end
      end
    end
  end
end
