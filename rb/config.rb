# FreeDictionary SDK configuration

module FreeDictionaryConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "FreeDictionary",
        "slug" => "free-dictionary",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://api.dictionaryapi.dev/api/v2",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "entry" => {},
        },
      },
      "entity" => {
        "entry" => {
          "fields" => [
            {
              "name" => "meanings",
              "short" => "Array of meanings for different parts of speech",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "origin",
              "short" => "Etymology and origin of the word",
              "type" => "`$STRING`",
            },
            {
              "name" => "phonetic",
              "short" => "Phonetic transcription of the word",
              "type" => "`$STRING`",
            },
            {
              "name" => "phonetics",
              "short" => "Array of phonetic representations",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "word",
              "short" => "The word being defined",
              "type" => "`$STRING`",
            },
          ],
          "name" => "entry",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "en",
                        "kind" => "param",
                        "name" => "language",
                        "orig" => "language",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "hello",
                        "kind" => "param",
                        "name" => "word",
                        "orig" => "word",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/entries/{language}/{word}",
                  "segments" => [
                    {
                      "lit" => "entries",
                    },
                    {
                      "var" => "language",
                    },
                    {
                      "var" => "word",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "language",
                      "word",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "entries",
                    "{language}",
                    "{word}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "entry",
              ],
            ],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    FreeDictionaryFeatures.make_feature(name)
  end
end
