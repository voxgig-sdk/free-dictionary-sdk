-- FreeDictionary SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "FreeDictionary",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "https://api.dictionaryapi.dev/api/v2",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["entry"] = {},
      },
    },
    entity = {
      ["entry"] = {
        ["fields"] = {
          {
            ["name"] = "meanings",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "origin",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "phonetic",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "phonetics",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "word",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "entry",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "en",
                      ["kind"] = "param",
                      ["name"] = "language",
                      ["orig"] = "language",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "hello",
                      ["kind"] = "param",
                      ["name"] = "word",
                      ["orig"] = "word",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/entries/{language}/{word}",
                ["parts"] = {
                  "entries",
                  "{language}",
                  "{word}",
                },
                ["select"] = {
                  ["exist"] = {
                    "language",
                    "word",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "entry",
            },
          },
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
