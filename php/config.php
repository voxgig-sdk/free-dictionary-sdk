<?php
declare(strict_types=1);

// FreeDictionary SDK configuration

class FreeDictionaryConfig
{
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "FreeDictionary",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
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
              'active' => true,
              'name' => 'meaning',
              'req' => false,
              'type' => '`$ARRAY`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'origin',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'phonetic',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'word',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 3,
            ],
          ],
          'name' => 'entry',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'example' => 'en',
                        'kind' => 'param',
                        'name' => 'language',
                        'orig' => 'language',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'index$' => 0,
                      ],
                      [
                        'active' => true,
                        'example' => 'hello',
                        'kind' => 'param',
                        'name' => 'word',
                        'orig' => 'word',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'index$' => 1,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/entries/{language}/{word}',
                  'parts' => [
                    'entries',
                    '{language}',
                    '{word}',
                  ],
                  'select' => [
                    'exist' => [
                      'language',
                      'word',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'list',
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'entry',
              ],
            ],
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
