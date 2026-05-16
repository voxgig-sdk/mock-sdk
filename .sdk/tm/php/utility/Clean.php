<?php
declare(strict_types=1);

// Mock SDK utility: clean

class MockClean
{
    public static function call(MockContext $ctx, mixed $val): mixed
    {
        return $val;
    }
}
