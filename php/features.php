<?php
declare(strict_types=1);

// Mock SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class MockFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new MockBaseFeature();
            case "test":
                return new MockTestFeature();
            default:
                return new MockBaseFeature();
        }
    }
}
