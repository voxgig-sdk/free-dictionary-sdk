-- FreeDictionary SDK error

local FreeDictionaryError = {}
FreeDictionaryError.__index = FreeDictionaryError


function FreeDictionaryError.new(code, msg, ctx)
  local self = setmetatable({}, FreeDictionaryError)
  self.is_sdk_error = true
  self.sdk = "FreeDictionary"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function FreeDictionaryError:error()
  return self.msg
end


function FreeDictionaryError:__tostring()
  return self.msg
end


return FreeDictionaryError
