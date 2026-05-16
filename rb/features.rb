# Mock SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module MockFeatures
  def self.make_feature(name)
    case name
    when "base"
      MockBaseFeature.new
    when "test"
      MockTestFeature.new
    else
      MockBaseFeature.new
    end
  end
end
