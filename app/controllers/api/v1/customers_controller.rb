# frozen_string_literal: true

module API
  module V1
    # This is the v1 controller for Customers
    class CustomersController < APIController
      include Concerns::AuthenticateRequest

      def index
        render json: Customer.all.order(name: :asc),
               each_serializer: CustomerSerializer
      end
    end
  end
end
