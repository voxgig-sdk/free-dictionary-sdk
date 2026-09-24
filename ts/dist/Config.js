"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'FreeDictionary',
        slug: "free-dictionary",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
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
        retry: {
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
        test: {
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
        timeout: {
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
    };
    options = {
        base: "https://api.dictionaryapi.dev/api/v2",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            entry: {},
        }
    };
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
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map