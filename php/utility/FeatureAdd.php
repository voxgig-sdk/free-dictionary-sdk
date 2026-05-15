<?php
declare(strict_types=1);

// FreeDictionary SDK utility: feature_add

class FreeDictionaryFeatureAdd
{
    public static function call(FreeDictionaryContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
