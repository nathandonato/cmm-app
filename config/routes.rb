# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resource :authentication, only: %i[create destroy]
      resources :todo_items
      resources :customers, only: %i[index]
    end
  end
end
