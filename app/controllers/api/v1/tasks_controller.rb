# frozen_string_literal: true

module API
  module V1
    # This is the v1 controller for Tasks
    class TasksController < APIController
      include Concerns::AuthenticateRequest

      def index
        tasks = tasks_by_project || Task.all

        render json: tasks.order(created_at: :desc),
               each_serializer: TaskSerializer
      end

      private

      def tasks_by_project
        return if filters_params.empty? || filters_params[:project_id].nil?

        Task.where(project_id: filters_params[:project_id])
      end

      def filters_params
        params.permit(:project_id)
      end
    end
  end
end
