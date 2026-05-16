package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewCartEntityFunc func(client *MockSDK, entopts map[string]any) MockEntity

var NewCouponEntityFunc func(client *MockSDK, entopts map[string]any) MockEntity

var NewCreateCustomResourceItemEntityFunc func(client *MockSDK, entopts map[string]any) MockEntity

var NewDeleteCustomResourceItemEntityFunc func(client *MockSDK, entopts map[string]any) MockEntity

var NewGetCustomResourceEntityFunc func(client *MockSDK, entopts map[string]any) MockEntity

var NewGetCustomResourceItemByIdEntityFunc func(client *MockSDK, entopts map[string]any) MockEntity

var NewPatchCustomResourceItemEntityFunc func(client *MockSDK, entopts map[string]any) MockEntity

var NewProductEntityFunc func(client *MockSDK, entopts map[string]any) MockEntity

var NewStatusEntityFunc func(client *MockSDK, entopts map[string]any) MockEntity

var NewUpdateCustomResourceItemEntityFunc func(client *MockSDK, entopts map[string]any) MockEntity

var NewUserEntityFunc func(client *MockSDK, entopts map[string]any) MockEntity

