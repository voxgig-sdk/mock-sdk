<?php
declare(strict_types=1);

// Mock SDK base feature

class MockBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(MockContext $ctx, array $options): void {}
    public function PostConstruct(MockContext $ctx): void {}
    public function PostConstructEntity(MockContext $ctx): void {}
    public function SetData(MockContext $ctx): void {}
    public function GetData(MockContext $ctx): void {}
    public function GetMatch(MockContext $ctx): void {}
    public function SetMatch(MockContext $ctx): void {}
    public function PrePoint(MockContext $ctx): void {}
    public function PreSpec(MockContext $ctx): void {}
    public function PreRequest(MockContext $ctx): void {}
    public function PreResponse(MockContext $ctx): void {}
    public function PreResult(MockContext $ctx): void {}
    public function PreDone(MockContext $ctx): void {}
    public function PreUnexpected(MockContext $ctx): void {}
}
