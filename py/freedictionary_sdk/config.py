# FreeDictionary SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "FreeDictionary",
            "slug": "free-dictionary",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://api.dictionaryapi.dev/api/v2",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "entry": {},
            },
        },
        "entity": {
      "entry": {
        "fields": [
          {
            "name": "meanings",
            "short": "Array of meanings for different parts of speech",
            "type": "`$ARRAY`",
          },
          {
            "name": "origin",
            "short": "Etymology and origin of the word",
            "type": "`$STRING`",
          },
          {
            "name": "phonetic",
            "short": "Phonetic transcription of the word",
            "type": "`$STRING`",
          },
          {
            "name": "phonetics",
            "short": "Array of phonetic representations",
            "type": "`$ARRAY`",
          },
          {
            "name": "word",
            "short": "The word being defined",
            "type": "`$STRING`",
          },
        ],
        "name": "entry",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": "en",
                      "kind": "param",
                      "name": "language",
                      "orig": "language",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "example": "hello",
                      "kind": "param",
                      "name": "word",
                      "orig": "word",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/entries/{language}/{word}",
                "segments": [
                  {
                    "lit": "entries",
                  },
                  {
                    "var": "language",
                  },
                  {
                    "var": "word",
                  },
                ],
                "select": {
                  "exist": [
                    "language",
                    "word",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "entries",
                  "{language}",
                  "{word}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "entry",
            ],
          ],
        },
      },
    },
    }
