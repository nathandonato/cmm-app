# frozen_string_literal: true

require 'test_helper'

class CustomerTest < ActiveSupport::TestCase
  setup do
    @customer = customers(:one)
  end

  test 'has name' do
    assert_equal "Pete's Delivery", @customer.name
  end

  test 'requires name' do
    refute Customer.new(name: nil).valid?
  end

  test 'destroys projects upon destruction' do
    assert_difference('Project.count', -1) do
      @customer.destroy
    end
  end
end
