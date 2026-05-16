package = "voxgig-sdk-mock"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/mock-sdk.git"
}
description = {
  summary = "Mock SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["mock_sdk"] = "mock_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
