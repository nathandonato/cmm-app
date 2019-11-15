# frozen_string_literal: true

require 'test_helper'

class ProjectSerializerTest < ActiveSupport::TestCase
  setup do
    @project = projects(:one)
  end

  test 'serializes project' do
    actual = ProjectSerializer.new(@project).as_json

    assert_equal @project.id, actual[:id]
    assert_equal @project.description, actual[:description]
  end
end
