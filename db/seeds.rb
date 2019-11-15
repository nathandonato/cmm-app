# frozen_string_literal: true

EMPLOYEES = [
  ['Jane Janeson', 'jjaneson', 'jjaneson@foo.bar'],
  ['Rick Rickson', 'rrickson', 'rrickson@foo.bar'],
  ['Dev user', 'devuser', 'user@foo.bar']
].freeze

CUSTOMERS_AND_PROJECTS = {
  "Pete's Delivery" => {
    'Logo design' => ['Determine color scheme', 'Mock up logo']
  },
  "Veronica's Construction" => {
    'Merch design' => ['Design t-shirt', 'Design hoodie']
  }
}.freeze

EMPLOYEES.each do |_name, username, email|
  next if User.find_by(username: username, email: email).present?

  User.create!(username: username, email: email, password: 'testing123')
end

CUSTOMERS_AND_PROJECTS.each do |name, projects|
  customer = Customer.find_or_create_by!(name: name)
  projects.each do |p_description, tasks|
    project = customer.projects.find_or_create_by!(description: p_description)
    tasks.each do |t_description|
      project.tasks.find_or_create_by!(description: t_description)
    end
  end
end
