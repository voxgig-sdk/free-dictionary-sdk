<?php
declare(strict_types=1);

// FreeDictionary SDK utility: prepare_body

class FreeDictionaryPrepareBody
{
    public static function call(FreeDictionaryContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
