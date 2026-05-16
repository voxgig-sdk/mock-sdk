<?php
declare(strict_types=1);

// Mock SDK utility: prepare_body

class MockPrepareBody
{
    public static function call(MockContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
