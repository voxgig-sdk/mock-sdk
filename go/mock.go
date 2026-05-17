package voxgigmocksdk

import (
	"github.com/voxgig-sdk/mock-sdk/go/core"
	"github.com/voxgig-sdk/mock-sdk/go/entity"
	"github.com/voxgig-sdk/mock-sdk/go/feature"
	_ "github.com/voxgig-sdk/mock-sdk/go/utility"
)

// Type aliases preserve external API.
type MockSDK = core.MockSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type MockEntity = core.MockEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type MockError = core.MockError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewCartEntityFunc = func(client *core.MockSDK, entopts map[string]any) core.MockEntity {
		return entity.NewCartEntity(client, entopts)
	}
	core.NewCouponEntityFunc = func(client *core.MockSDK, entopts map[string]any) core.MockEntity {
		return entity.NewCouponEntity(client, entopts)
	}
	core.NewCreateCustomResourceItemEntityFunc = func(client *core.MockSDK, entopts map[string]any) core.MockEntity {
		return entity.NewCreateCustomResourceItemEntity(client, entopts)
	}
	core.NewDeleteCustomResourceItemEntityFunc = func(client *core.MockSDK, entopts map[string]any) core.MockEntity {
		return entity.NewDeleteCustomResourceItemEntity(client, entopts)
	}
	core.NewGetCustomResourceEntityFunc = func(client *core.MockSDK, entopts map[string]any) core.MockEntity {
		return entity.NewGetCustomResourceEntity(client, entopts)
	}
	core.NewGetCustomResourceItemByIdEntityFunc = func(client *core.MockSDK, entopts map[string]any) core.MockEntity {
		return entity.NewGetCustomResourceItemByIdEntity(client, entopts)
	}
	core.NewPatchCustomResourceItemEntityFunc = func(client *core.MockSDK, entopts map[string]any) core.MockEntity {
		return entity.NewPatchCustomResourceItemEntity(client, entopts)
	}
	core.NewProductEntityFunc = func(client *core.MockSDK, entopts map[string]any) core.MockEntity {
		return entity.NewProductEntity(client, entopts)
	}
	core.NewStatusEntityFunc = func(client *core.MockSDK, entopts map[string]any) core.MockEntity {
		return entity.NewStatusEntity(client, entopts)
	}
	core.NewUpdateCustomResourceItemEntityFunc = func(client *core.MockSDK, entopts map[string]any) core.MockEntity {
		return entity.NewUpdateCustomResourceItemEntity(client, entopts)
	}
	core.NewUserEntityFunc = func(client *core.MockSDK, entopts map[string]any) core.MockEntity {
		return entity.NewUserEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewMockSDK = core.NewMockSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
