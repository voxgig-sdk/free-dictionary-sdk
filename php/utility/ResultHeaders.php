<?php
declare(strict_types=1);

// FreeDictionary SDK utility: result_headers

class FreeDictionaryResultHeaders
{
    public static function call(FreeDictionaryContext $ctx): ?FreeDictionaryResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
