<?php
declare(strict_types=1);

// FreeDictionary SDK configuration

class FreeDictionaryConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "FreeDictionary",
                "slug" => "free-dictionary",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://api.dictionaryapi.dev/api/v2",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "entry" => [],
                ],
            ],
            "entity" => [
        'entry' => [
          'fields' => [
            [
              'name' => 'meanings',
              'title' => 'Meanings',
              'type' => '`$ARRAY`',
              'short' => 'Array of meanings for different parts of speech',
            ],
            [
              'name' => 'origin',
              'title' => 'Origin',
              'type' => '`$STRING`',
              'short' => 'Etymology and origin of the word',
            ],
            [
              'name' => 'phonetic',
              'title' => 'Phonetic',
              'type' => '`$STRING`',
              'short' => 'Phonetic transcription of the word',
            ],
            [
              'name' => 'phonetics',
              'title' => 'Phonetics',
              'type' => '`$ARRAY`',
              'short' => 'Array of phonetic representations',
            ],
            [
              'name' => 'word',
              'title' => 'Word',
              'type' => '`$STRING`',
              'short' => 'The word being defined',
            ],
          ],
          'name' => 'entry',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/entries/{language}/{word}',
                  'segments' => [
                    [
                      'lit' => 'entries',
                    ],
                    [
                      'var' => 'language',
                    ],
                    [
                      'var' => 'word',
                    ],
                  ],
                  'parts' => [
                    'entries',
                    '{language}',
                    '{word}',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'language',
                        'orig' => 'language',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                        'example' => 'en',
                      ],
                      [
                        'name' => 'word',
                        'orig' => 'word',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                        'example' => 'hello',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'language',
                      'word',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return FreeDictionaryFeatures::make_feature($name);
    }
}
