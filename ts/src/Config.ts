
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


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
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
          "title": "Meanings",
          "type": "`$ARRAY`",
          "short": "Array of meanings for different parts of speech"
        },
        {
          "name": "origin",
          "title": "Origin",
          "type": "`$STRING`",
          "short": "Etymology and origin of the word"
        },
        {
          "name": "phonetic",
          "title": "Phonetic",
          "type": "`$STRING`",
          "short": "Phonetic transcription of the word"
        },
        {
          "name": "phonetics",
          "title": "Phonetics",
          "type": "`$ARRAY`",
          "short": "Array of phonetic representations"
        },
        {
          "name": "word",
          "title": "Word",
          "type": "`$STRING`",
          "short": "The word being defined"
        }
      ],
      "name": "entry",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
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
              "parts": [
                "entries",
                "{language}",
                "{word}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "language",
                    "orig": "language",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "en"
                  },
                  {
                    "name": "word",
                    "orig": "word",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "hello"
                  }
                ]
              },
              "select": {
                "exist": [
                  "language",
                  "word"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

