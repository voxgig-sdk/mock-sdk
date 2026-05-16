<?php
declare(strict_types=1);

// Mock SDK utility: result_headers

class MockResultHeaders
{
    public static function call(MockContext $ctx): ?MockResult
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
