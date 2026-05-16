# Mock SDK exists test

require "minitest/autorun"
require_relative "../Mock_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = MockSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
