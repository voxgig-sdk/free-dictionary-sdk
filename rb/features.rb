# FreeDictionary SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module FreeDictionaryFeatures
  def self.make_feature(name)
    case name
    when "base"
      FreeDictionaryBaseFeature.new
    when "ratelimit"
      FreeDictionaryRatelimitFeature.new
    when "retry"
      FreeDictionaryRetryFeature.new
    when "test"
      FreeDictionaryTestFeature.new
    when "timeout"
      FreeDictionaryTimeoutFeature.new
    else
      FreeDictionaryBaseFeature.new
    end
  end
end
