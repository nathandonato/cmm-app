# frozen_string_literal: true

require 'test_helper'

class CustomerSerializerTest < ActiveSupport::TestCase
  setup do
    @customer = customers(:one)
  end

  test 'serializes customer' do
    actual = CustomerSerializer.new(@customer).as_json

    assert_equal @customer.id, actual[:id]
    assert_equal @customer.name, actual[:name]
  end
end
