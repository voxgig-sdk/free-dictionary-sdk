# FreeDictionary SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module FreeDictionaryFeatures
  def self.make_feature(name)
    case name
    when "base"
      FreeDictionaryBaseFeature.new
    when "test"
      FreeDictionaryTestFeature.new
    else
      FreeDictionaryBaseFeature.new
    end
  end
end
