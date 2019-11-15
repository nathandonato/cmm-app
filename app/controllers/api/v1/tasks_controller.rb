# frozen_string_literal: true

module API
  module V1
    # This is the v1 controller for Tasks
    class TasksController < APIController
      include Concerns::AuthenticateRequest

      rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

      def index
        tasks = tasks_by_project || Task.all

        render json: tasks.order(created_at: :desc),
               each_serializer: TaskSerializer
      end

      def create
        render_created || render_record_errors(@task)
      end

      private

      def tasks_by_project
        return if filters_params.empty? || filters_params[:project_id].nil?

        Task.where(project_id: filters_params[:project_id])
      end

      def filters_params
        params.permit(:project_id)
      end

      def task_params
        params.require(:task).permit(:project_id, :description)
      end

      def render_created
        project = Project.find(task_params[:project_id])
        @task = project.tasks.new(task_params)
        return unless @task.save

        render json: @task, serializer: TaskSerializer, status: :created
      end
    end
  end
end
