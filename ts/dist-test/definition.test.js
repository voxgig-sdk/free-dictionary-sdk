"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
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
        "query": [],
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
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map