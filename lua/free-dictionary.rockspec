package = "voxgig-sdk-free-dictionary"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/free-dictionary-sdk.git"
}
description = {
  summary = "FreeDictionary SDK for Lua",
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
    ["free-dictionary_sdk"] = "free-dictionary_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
