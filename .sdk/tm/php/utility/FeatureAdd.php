<?php
declare(strict_types=1);

// Mock SDK utility: feature_add

class MockFeatureAdd
{
    public static function call(MockContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
