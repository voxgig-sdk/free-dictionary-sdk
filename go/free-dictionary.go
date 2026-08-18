package voxgigfreedictionarysdk

import (
	"github.com/voxgig-sdk/free-dictionary-sdk/go/core"
	"github.com/voxgig-sdk/free-dictionary-sdk/go/entity"
	"github.com/voxgig-sdk/free-dictionary-sdk/go/feature"
	_ "github.com/voxgig-sdk/free-dictionary-sdk/go/utility"
)

// Type aliases preserve external API.
type FreeDictionarySDK = core.FreeDictionarySDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type FreeDictionaryEntity = core.FreeDictionaryEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type FreeDictionaryError = core.FreeDictionaryError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewEntryEntityFunc = func(client *core.FreeDictionarySDK, entopts map[string]any) core.FreeDictionaryEntity {
		return entity.NewEntryEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewFreeDictionarySDK = core.NewFreeDictionarySDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewFreeDictionarySDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *FreeDictionarySDK  { return NewFreeDictionarySDK(nil) }
func Test() *FreeDictionarySDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
