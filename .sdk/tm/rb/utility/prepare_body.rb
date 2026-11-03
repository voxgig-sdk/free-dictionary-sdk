# FreeDictionary SDK utility: prepare_body
require_relative 'media'
module FreeDictionaryUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return FreeDictionaryUtilities.raw_body(ctx.reqdata) if FreeDictionaryUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
