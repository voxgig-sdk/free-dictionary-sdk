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
        "test" => {
          "options" => {
            "active" => false,
          },
          "transport" => "base",
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
                  "parts" => [
                    "entries",
                    "{language}",
                    "{word}",
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
