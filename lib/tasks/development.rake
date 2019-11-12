# frozen_string_literal: true

namespace :development do
  desc 'Create a test user'
  task create_test_user: :environment do
    User.create!(username: 'devuser',
                 email: 'foo@bar.com',
                 password: 'testing123')
  end
end
