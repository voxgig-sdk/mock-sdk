<?php
declare(strict_types=1);

// Mock SDK exists test

require_once __DIR__ . '/../mock_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = MockSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
