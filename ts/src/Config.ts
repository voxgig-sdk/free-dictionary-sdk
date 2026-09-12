
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

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
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
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

