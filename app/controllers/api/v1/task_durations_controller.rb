# frozen_string_literal: true

module API
  module V1
    # This is the v1 controller for TaskDurations
    class TaskDurationsController < APIController
      include Concerns::AuthenticateRequest
      include Concerns::CommonRenders

      before_action :find_task_duration, only: %i[show update destroy]
      rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

      def index
        render json: relevant_task_durations.order(created_at: :asc),
               each_serializer: TaskDurationSerializer
      end

      def show
        render json: @task_duration, serializer: TaskDurationSerializer,
               status: :ok
      end

      def create
        render_created || render_record_errors(@task_duration)
      end

      def update
        render_updated || render_record_errors(@task_duration)
      end

      def destroy
        @task_duration.destroy
        head :no_content
      end

      private

      def relevant_task_durations
        opts = { user_id: current_user.id }
        opts = opts.merge(task_id: task_id) if task_id.present?
        TaskDuration.where(opts)
      end

      def task_id
        return if filters_params.empty? || filters_params[:task_id].nil?

        filters_params[:task_id]
      end

      def filters_params
        params.permit(:task_id)
      end

      def find_task_duration
        @task_duration = current_user.task_durations.find(params[:id])
      end

      def task_duration_params
        params.require(:task_duration).permit(:user_id, :task_id, :started_at,
                                              :stopped_at)
      end

      def render_created
        @task_duration = current_user.task_durations.new(task_duration_params)
        return unless @task_duration.save

        render json: @task_duration, serializer: TaskDurationSerializer,
               status: :created
      end

      def render_updated
        return unless @task_duration.update(task_duration_params)

        render json: @task_duration, serializer: TaskDurationSerializer,
               status: :ok
      end
    end
  end
end
