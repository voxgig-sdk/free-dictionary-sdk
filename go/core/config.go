package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "FreeDictionary",
			"slug": "free-dictionary",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://api.dictionaryapi.dev/api/v2",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"entry": map[string]any{},
			},
		},
		"entity": map[string]any{
			"entry": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "meanings",
						"short": "Array of meanings for different parts of speech",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "origin",
						"short": "Etymology and origin of the word",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "phonetic",
						"short": "Phonetic transcription of the word",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "phonetics",
						"short": "Array of phonetic representations",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "word",
						"short": "The word being defined",
						"type": "`$STRING`",
					},
				},
				"name": "entry",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "en",
											"kind": "param",
											"name": "language",
											"orig": "language",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "hello",
											"kind": "param",
											"name": "word",
											"orig": "word",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/entries/{language}/{word}",
								"parts": []any{
									"entries",
									"{language}",
									"{word}",
								},
								"select": map[string]any{
									"exist": []any{
										"language",
										"word",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"entry",
						},
					},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
