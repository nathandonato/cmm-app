# frozen_string_literal: true

module API
  module V1
    # This is the v1 controller for Projects
    class ProjectsController < APIController
      include Concerns::AuthenticateRequest

      def index
        projects = projects_by_customer || Project.all

        render json: projects.order(description: :asc),
               each_serializer: ProjectSerializer
      end

      private

      def projects_by_customer
        return if filters_params.empty? || filters_params[:customer_id].nil?

        Project.where(customer_id: filters_params[:customer_id])
      end

      def filters_params
        params.permit(:customer_id)
      end
    end
  end
end
