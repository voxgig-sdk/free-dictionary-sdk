# FreeDictionary SDK configuration


def make_config():
    return {
        "main": {
            "name": "FreeDictionary",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://api.dictionaryapi.dev/api/v2",
            "auth": {
                "prefix": "Bearer",
            },
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
            "active": True,
            "name": "meaning",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "origin",
            "req": False,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "phonetic",
            "req": False,
            "type": "`$STRING`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "word",
            "req": False,
            "type": "`$STRING`",
            "index$": 3,
          },
        ],
        "name": "entry",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "example": "en",
                      "kind": "param",
                      "name": "language",
                      "orig": "language",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": "hello",
                      "kind": "param",
                      "name": "word",
                      "orig": "word",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/entries/{language}/{word}",
                "parts": [
                  "entries",
                  "{language}",
                  "{word}",
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
                "index$": 0,
              },
            ],
            "key$": "list",
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
