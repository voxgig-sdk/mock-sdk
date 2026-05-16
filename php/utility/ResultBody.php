<?php
declare(strict_types=1);

// Mock SDK utility: result_body

class MockResultBody
{
    public static function call(MockContext $ctx): ?MockResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
