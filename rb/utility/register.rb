# FreeDictionary SDK utility registration
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
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

FreeDictionaryUtility.registrar = ->(u) {
  u.clean = FreeDictionaryUtilities::Clean
  u.done = FreeDictionaryUtilities::Done
  u.make_error = FreeDictionaryUtilities::MakeError
  u.feature_add = FreeDictionaryUtilities::FeatureAdd
  u.feature_hook = FreeDictionaryUtilities::FeatureHook
  u.feature_init = FreeDictionaryUtilities::FeatureInit
  u.fetcher = FreeDictionaryUtilities::Fetcher
  u.make_fetch_def = FreeDictionaryUtilities::MakeFetchDef
  u.make_context = FreeDictionaryUtilities::MakeContext
  u.make_options = FreeDictionaryUtilities::MakeOptions
  u.make_request = FreeDictionaryUtilities::MakeRequest
  u.make_response = FreeDictionaryUtilities::MakeResponse
  u.make_result = FreeDictionaryUtilities::MakeResult
  u.make_point = FreeDictionaryUtilities::MakePoint
  u.make_spec = FreeDictionaryUtilities::MakeSpec
  u.make_url = FreeDictionaryUtilities::MakeUrl
  u.param = FreeDictionaryUtilities::Param
  u.prepare_auth = FreeDictionaryUtilities::PrepareAuth
  u.prepare_body = FreeDictionaryUtilities::PrepareBody
  u.prepare_headers = FreeDictionaryUtilities::PrepareHeaders
  u.prepare_method = FreeDictionaryUtilities::PrepareMethod
  u.prepare_params = FreeDictionaryUtilities::PrepareParams
  u.prepare_path = FreeDictionaryUtilities::PreparePath
  u.prepare_query = FreeDictionaryUtilities::PrepareQuery
  u.graphql_body = FreeDictionaryUtilities::GraphqlBody
  u.graphql_errors = FreeDictionaryUtilities::GraphqlErrors
  u.result_basic = FreeDictionaryUtilities::ResultBasic
  u.result_body = FreeDictionaryUtilities::ResultBody
  u.result_headers = FreeDictionaryUtilities::ResultHeaders
  u.transform_request = FreeDictionaryUtilities::TransformRequest
  u.transform_response = FreeDictionaryUtilities::TransformResponse
}
