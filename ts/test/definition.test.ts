import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "entry",
    "accessor": "Entry",
    "op": "list",
    "method": "GET",
    "path": "/entries/{language}/{word}",
    "args": [
      {
        "name": "language",
        "wire": "language",
        "value": "en"
      },
      {
        "name": "word",
        "wire": "word",
        "value": "hello"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "word": "hello",
        "phonetic": "həˈləʊ",
        "phonetics": [
          {
            "text": "həˈləʊ",
            "audio": "//ssl.gstatic.com/dictionary/static/sounds/20200429/hello--_gb_1.mp3"
          },
          {
            "text": "hɛˈləʊ"
          }
        ],
        "origin": "early 19th century: variant of earlier hollo ; related to holla.",
        "meanings": [
          {
            "partOfSpeech": "exclamation",
            "definitions": [
              {
                "definition": "used as a greeting or to begin a phone conversation.",
                "example": "hello there, Katie!",
                "synonyms": [],
                "antonyms": []
              }
            ]
          },
          {
            "partOfSpeech": "noun",
            "definitions": [
              {
                "definition": "an utterance of 'hello'; a greeting.",
                "example": "she was getting polite nods and hellos from people",
                "synonyms": [],
                "antonyms": []
              }
            ]
          },
          {
            "partOfSpeech": "verb",
            "definitions": [
              {
                "definition": "say or shout 'hello'.",
                "example": "I pressed the phone button and helloed",
                "synonyms": [],
                "antonyms": []
              }
            ]
          }
        ]
      }
    ],
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
