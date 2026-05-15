# FreeDictionary SDK utility: make_context
require_relative '../core/context'
module FreeDictionaryUtilities
  MakeContext = ->(ctxmap, basectx) {
    FreeDictionaryContext.new(ctxmap, basectx)
  }
end
