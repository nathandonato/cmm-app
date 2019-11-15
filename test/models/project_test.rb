require 'test_helper'

class ProjectTest < ActiveSupport::TestCase
  setup do
    @project = projects(:one)
    @customer = customers(:one)
  end

  test 'can create' do
    assert Project.new(customer: @customer, description: 'foo').valid?
  end

  test 'has attributes' do
    assert_equal 'Logo design', @project.description
    assert_equal @customer, @project.customer
  end

  test 'requires description' do
    refute Project.new(customer: @customer).valid?
  end

  test 'requires customer' do
    refute Project.new(description: 'Foobar').valid?
  end
end
