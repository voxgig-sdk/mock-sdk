<?php
declare(strict_types=1);

// Mock SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class MockMakeContext
{
    public static function call(array $ctxmap, ?MockContext $basectx): MockContext
    {
        return new MockContext($ctxmap, $basectx);
    }
}
