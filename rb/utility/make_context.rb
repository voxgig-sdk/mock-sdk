# Mock SDK utility: make_context
require_relative '../core/context'
module MockUtilities
  MakeContext = ->(ctxmap, basectx) {
    MockContext.new(ctxmap, basectx)
  }
end
