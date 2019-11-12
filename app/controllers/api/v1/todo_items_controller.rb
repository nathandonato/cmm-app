# frozen_string_literal: true

require 'memoist'

module API
  module V1
    # This is the v1 controller for TodoItems
    class TodoItemsController < APIController
      include Concerns::AuthenticateRequest
      include Concerns::CommonRenders

      before_action :find_todo_item, only: %i[show update destroy]
      rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

      # GET /todo_items
      def index
        render json: current_user.todo_items,
               each_serializer: TodoItemSerializer
      end

      # GET /todo_items/1
      def show
        render json: @todo_item, serializer: TodoItemSerializer, status: :ok
      end

      # POST /todo_items
      def create
        render_created || render_record_errors(@todo_item)
      end

      # PATCH/PUT /todo_items/1
      def update
        render_updated || render_record_errors(@todo_item)
      end

      # DELETE /todo_items/1
      def destroy
        @todo_item.destroy
        head :no_content
      end

      private

      def find_todo_item
        @todo_item = current_user.todo_items.find(params[:id])
      end

      def todo_item_params
        params.require(:todo_item).permit(:description, :completed_at)
      end

      def render_created
        @todo_item = current_user.todo_items.new(todo_item_params)
        return unless @todo_item.save

        render json: @todo_item, serializer: TodoItemSerializer,
               status: :created
      end

      def render_updated
        return unless @todo_item.update(todo_item_params)

        render json: @todo_item, serializer: TodoItemSerializer, status: :ok
      end
    end
  end
end
