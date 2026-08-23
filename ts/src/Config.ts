
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

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
      }
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
              "parts": [
                "entries",
                "{language}",
                "{word}"
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
              }
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
  config
}

