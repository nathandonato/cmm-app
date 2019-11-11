# frozen_string_literal: true

require 'memoist'

module API
  module V1
    # This is the v1 controller for TodoItems
    class TodoItemsController < APIController
      include Concerns::AuthenticateRequest

      before_action :set_todo_item, only: %i[show update destroy]

      # GET /todo_items
      def index
        render json: current_user.todo_items,
               each_serializer: TodoItemSerializer
      end

      # GET /todo_items/1
      def show
        render not_found_payload || show_payload
      end

      # POST /todo_items
      def create
        render create_payload || errors_payload
      end

      # PATCH/PUT /todo_items/1
      def update
        render not_found_payload || update_payload || errors_payload
      end

      # DELETE /todo_items/1
      def destroy
        @todo_item&.destroy
        head :no_content
      end

      private

      def not_found_payload
        return unless @todo_item.nil?

        { json: { error: 'Todo item not found' }, status: :not_found }
      end

      def errors_payload
        { json: @todo_item.errors, status: :unprocessable_entity }
      end

      def show_payload
        { json: @todo_item, serializer: TodoItemSerializer, status: :ok }
      end

      def create_payload
        @todo_item = current_user.todo_items.new(todo_item_params)
        return unless @todo_item.save

        { json: @todo_item, serializer: TodoItemSerializer, status: :created }
      end

      def update_payload
        return unless @todo_item.update(todo_item_params)

        show_payload
      end

      private

      def set_todo_item
        @todo_item = current_user.todo_items.find_by_id(params[:id])
      end

      def todo_item_params
        params.require(:todo_item).permit(:description, :completed_at)
      end
    end
  end
end
