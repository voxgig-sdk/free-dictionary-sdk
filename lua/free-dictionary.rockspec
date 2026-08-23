package = "voxgig-sdk-free-dictionary"
version = "0.0.1-1"
source = {
  -- git+https (GitHub dropped git:// in 2022); pin the install to the release
  -- tag pushed by `make publish`, and point at the lua/ subdir of the monorepo.
  url = "git+https://github.com/voxgig-sdk/free-dictionary-sdk.git",
  tag = "lua/v0.0.1",
  dir = "free-dictionary-sdk/lua"
}
description = {
  summary = "Unofficial generated Lua SDK for the Free Dictionary public API. Not affiliated with or endorsed by the upstream API provider.",
  homepage = "https://github.com/voxgig-sdk/free-dictionary-sdk",
  issues_url = "https://github.com/voxgig-sdk/free-dictionary-sdk/issues",
  license = "MIT",
  labels = { "voxgig", "sdk", "generated-sdk", "openapi", "api-client", "free-dictionary" }
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["free-dictionary_sdk"] = "free-dictionary_sdk.lua",
    ["config"] = "config.lua",
    ["config_shared"] = "config_shared.lua",
    ["features"] = "features.lua",
    ["feature.base_feature"] = "feature/base_feature.lua",
    ["feature.test_feature"] = "feature/test_feature.lua",
  }
}
