# Mock SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

MockUtility.registrar = ->(u) {
  u.clean = MockUtilities::Clean
  u.done = MockUtilities::Done
  u.make_error = MockUtilities::MakeError
  u.feature_add = MockUtilities::FeatureAdd
  u.feature_hook = MockUtilities::FeatureHook
  u.feature_init = MockUtilities::FeatureInit
  u.fetcher = MockUtilities::Fetcher
  u.make_fetch_def = MockUtilities::MakeFetchDef
  u.make_context = MockUtilities::MakeContext
  u.make_options = MockUtilities::MakeOptions
  u.make_request = MockUtilities::MakeRequest
  u.make_response = MockUtilities::MakeResponse
  u.make_result = MockUtilities::MakeResult
  u.make_point = MockUtilities::MakePoint
  u.make_spec = MockUtilities::MakeSpec
  u.make_url = MockUtilities::MakeUrl
  u.param = MockUtilities::Param
  u.prepare_auth = MockUtilities::PrepareAuth
  u.prepare_body = MockUtilities::PrepareBody
  u.prepare_headers = MockUtilities::PrepareHeaders
  u.prepare_method = MockUtilities::PrepareMethod
  u.prepare_params = MockUtilities::PrepareParams
  u.prepare_path = MockUtilities::PreparePath
  u.prepare_query = MockUtilities::PrepareQuery
  u.result_basic = MockUtilities::ResultBasic
  u.result_body = MockUtilities::ResultBody
  u.result_headers = MockUtilities::ResultHeaders
  u.transform_request = MockUtilities::TransformRequest
  u.transform_response = MockUtilities::TransformResponse
}
