<?php
declare(strict_types=1);

// FreeDictionary SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class FreeDictionaryMakeContext
{
    public static function call(array $ctxmap, ?FreeDictionaryContext $basectx): FreeDictionaryContext
    {
        return new FreeDictionaryContext($ctxmap, $basectx);
    }
}
