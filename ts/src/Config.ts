
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'FreeDictionary',
        slug: "free-dictionary",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
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
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://api.dictionaryapi.dev/api/v2",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      entry: {
      },

    }
  }


  entity = {
    "entry": {
      "fields": [
        {
          "name": "meanings",
          "short": "Array of meanings for different parts of speech",
          "type": "`$ARRAY`"
        },
        {
          "name": "origin",
          "short": "Etymology and origin of the word",
          "type": "`$STRING`"
        },
        {
          "name": "phonetic",
          "short": "Phonetic transcription of the word",
          "type": "`$STRING`"
        },
        {
          "name": "phonetics",
          "short": "Array of phonetic representations",
          "type": "`$ARRAY`"
        },
        {
          "name": "word",
          "short": "The word being defined",
          "type": "`$STRING`"
        }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "example": "hello",
                    "kind": "param",
                    "name": "word",
                    "orig": "word",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/entries/{language}/{word}",
              "segments": [
                {
                  "lit": "entries"
                },
                {
                  "var": "language"
                },
                {
                  "var": "word"
                }
              ],
              "select": {
                "exist": [
                  "language",
                  "word"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "entries",
                "{language}",
                "{word}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "entry"
          ]
        ]
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

