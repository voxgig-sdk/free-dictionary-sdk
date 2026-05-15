# FreeDictionary SDK exists test

require "minitest/autorun"
require_relative "../FreeDictionary_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = FreeDictionarySDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
