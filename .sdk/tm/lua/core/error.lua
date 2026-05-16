-- Mock SDK error

local MockError = {}
MockError.__index = MockError


function MockError.new(code, msg, ctx)
  local self = setmetatable({}, MockError)
  self.is_sdk_error = true
  self.sdk = "Mock"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function MockError:error()
  return self.msg
end


function MockError:__tostring()
  return self.msg
end


return MockError
