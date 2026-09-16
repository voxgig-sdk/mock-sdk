# Mock SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module MockFeatures
  def self.make_feature(name)
    case name
    when "base"
      MockBaseFeature.new
    when "ratelimit"
      MockRatelimitFeature.new
    when "retry"
      MockRetryFeature.new
    when "test"
      MockTestFeature.new
    when "timeout"
      MockTimeoutFeature.new
    else
      MockBaseFeature.new
    end
  end
end
