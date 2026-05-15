<?php
declare(strict_types=1);

// FreeDictionary SDK utility: result_body

class FreeDictionaryResultBody
{
    public static function call(FreeDictionaryContext $ctx): ?FreeDictionaryResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
